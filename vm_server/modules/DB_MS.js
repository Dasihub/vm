const sql = require('mssql')
require('dotenv').config()
const caesarShift = require('./caesar.js')
const { md5, format } = require('./utils')
const ID_PROG_ID = process.env.ID_PROG_ID

let CONFIGDB = {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    server: process.env.DBSERVER,
    database: process.env.DBNAME,
    stream: !!parseInt(process.env.DBMS_STREAM),
    requestTimeout: parseInt(process.env.DBMS_REQUESTTIMEOUT), // 30000, //ms 30sec
    options: {
        encrypt: !!parseInt(process.env.DBMS_ENCRYPT),
    },
}

const poolPromiseAuth = new sql.ConnectionPool(CONFIGDB)
    .connect()
    .then((pool) => {
        console.log('Connected to Auth MSSQL')
        return pool
    })
    .catch((err) => console.log('Database Auth Connection Failed! Bad Config: ', err))

let CONNECTED = false
const getConnected = () => {
    return CONNECTED
}
const setConnected = (connected) => {
    CONNECTED = connected
}

let poolPromise = null
const setPool = (pool) => {
    // console.log(pool.request.query(format('SELECT id_a_year FROM V_GetCurrentAcademicIdYear')), 'pool')
    poolPromise = pool
}
const getPool = () => {
    if (poolPromise == null) {
        return false
    }
    return poolPromise.request()
}
const queryPool = (text, params) => {
    if (poolPromise == null) {
        return false
    }
    return poolPromise.request().query(format(text, params))

    // const result = await queryPool(
    //   "select id_role from T_Session where id_session = {0}",
    //   [1]
    // );
}

async function connectWithCookie(cookie) {
    const poolAuth = await poolPromiseAuth
    let r = await poolAuth
        .request()
        .input('Cookie', sql.NVarChar, cookie)
        .input('AVN_Prog', sql.NVarChar, ID_PROG_ID)
        .execute(`GET_USER_COOKIE`)
    if (r && r.recordset[0] && r.recordset[0].login) {
        const { id_avn_user, id_user, id_role, last_login, id_session, login, password } = r.recordset[0]
        return await connectWithSQL(login, password)
    } else return false
}

async function connectWithLogin(userLogin, userPassword) {
    const poolAuth = await poolPromiseAuth
    // const ip = req.headers["x-forwarded-for"]
    //   ? req.headers["x-forwarded-for"].split(",").shift()
    //   : req.ip;
    let r = await poolAuth
        .request()
        .input('Login', sql.NVarChar, userLogin)
        .input('Passw', sql.NVarChar, userPassword)
        .input('NewPassw', sql.NVarChar, null)
        .input('AVN_Prog', sql.NVarChar, ID_PROG_ID)
        .input('ip', sql.NVarChar, 'ip')
        .input('compName', sql.NVarChar, 'TOICHUBEK')
        .input('inputLogin', sql.NVarChar, userLogin)
        .input('isWeb', sql.NVarChar, '0')
        .input('newPasswLn', sql.NVarChar, '4')
        .execute(`GET_USER`)

    const { login, password } = r.recordset[0]
    if (login == null) {
        return false
    }
    return await connectWithSQL(login, password)
}

async function connectWithSQL(loginSQL, passwordSQL) {
    const loginDecrypted = caesarShift(loginSQL, 1)
    const passwordDecrypted = caesarShift(passwordSQL, 1)

    CONFIGDB = { ...CONFIGDB, user: loginDecrypted, password: passwordDecrypted }
    poolPromise = new sql.ConnectionPool(CONFIGDB)
        .connect()
        .then((pool) => {
            console.log('Connected to MSSQL')
            setConnected(true)
            setPool(pool)
            return pool.request()
        })
        .catch((err) => {
            console.log('Database Connection Failed! Bad Config: ', err)
            return false
        })
    return poolPromise
}

module.exports = {
    sql,
    poolPromise: getPool,
    getPool,
    getConnected,
    queryPool,
    connectWithLogin,
    connectWithCookie,
    myPool: poolPromiseAuth,
}
