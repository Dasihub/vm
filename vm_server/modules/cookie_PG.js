const { md5 } = require('./utils')
require('dotenv').config()
const db = require('./DB_PG')
const COOKIE_NAME = process.env.COOKIE_NAME
const COOKIE_MOBILE = process.env.COOKIE_MOBILE
const ID_PROG_ID = process.env.ID_PROG_ID
const MAX_AGE = parseInt(process.env.MAX_AGE)

//id
async function Generate(res) {
    const cookieId = require('uuid/v4')()
    res.cookie(COOKIE_NAME, cookieId, { maxAge: MAX_AGE, httpOnly: true })
    return cookieId
}

//{rowCount} false
async function Delete(req, res) {
    const cookieId = md5(String(req.cookies[COOKIE_NAME]))
    res.clearCookie(COOKIE_NAME)
    const { command, rowCount } = await db.query(
        `UPDATE "Session" SET offline=true
                                                WHERE offline=false AND login IN
                                                (SELECT login FROM "Session" 
                                                WHERE cookie=$1)`,
        [cookieId],
    )
    if (command == 'UPDATE') return { rowCount }
    else return false
}

//{role, id} false
async function GetUser(req) {
    if (process.env.NODE_ENV === 'development' && process.env.FAKE_MODE === 'true') {
        return { role: process.env.FAKE_ID_ROLE, id: process.env.FAKE_ID_USER }
    }
}

if (req && req.cookies && COOKIE_NAME in req.cookies) {
    const { rowCount, rows } = await db.query(`SELECT * FROM "fn_Session_Get_User"($1)`, [
        md5(String(req.cookies[COOKIE_NAME])),
    ])
    //  console.log("fn_Session_Get_User",rowCount, rows)
    if (rowCount) return { ...rows[0] }
    {
    }
    return false
}

//true false
async function Check(req, role) {
    const user = await GetUser(req)
    switch (role) {
        case 1:
            if (user && user.role == role) {
                return true
            } else {
                return false
            }
            break
        case 2:
            if (user && user.role == role) {
                return true
            } else {
                return false
            }
            break
        default:
            return false
            break
    }
}

//true false
async function Login(req, res, role, login, id) {
    switch (role) {
        case 1:
        case 2:
            // if cookies does not exist then save generated cookieId to res.cookies then insert into session
            const isMobile = String(req.cookies[COOKIE_MOBILE]) == 'true' ? true : false
            const cookieId = md5(await Generate(res))
            const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').shift() : req.ip
            // console.log("headers",req.headers)
            const { rows } = await db.query(`SELECT  EXISTS( select 1 FROM "Session" where login =$1)`, [String(login)])

            if (rows[0].exists) {
                const { rowCount: updated } = await db.query(
                    `UPDATE "Session" 
                                             SET offline=false, 
                                                 last_action=current_timestamp, 
                                                 cookie=$2, 
                                                 id_role=$3, 
                                                 id_user=$4, 
                                                 is_mobile=$5
                                             WHERE login=$1`,
                    [String(login), cookieId, role, id, isMobile],
                )
                if (!!updated) await LoginLog(String(login), role, id, isMobile, ip)
                return !!updated
            } else {
                // console.log(String(req.cookies['isMobile']), isMobile);
                const { rowCount: inserted } = await db.query(
                    `
            INSERT INTO "Session" (cookie, id_role, login, id_user, last_action, is_mobile)
            VALUES ($1, $2, $3, $4, current_timestamp, $5)`,
                    [cookieId, role, login, id, isMobile],
                )
                // console.log(inserted);
                if (!!inserted) await LoginLog(String(login), role, id, isMobile, ip)
                return !!inserted
            }
            return false
            break
        default:
            return false
            break
    }
}

async function LoginLog(login, role, id, isMobile, ip) {
    const { rowCount } = await db.query(
        `
        INSERT INTO "Session_log" (login, id_role, id_user, log_time, is_mobile, ip)
        VALUES ($1, $2, $3, current_timestamp, $4, $5)`,
        [login, role, id, isMobile, ip],
    )

    if (!!rowCount) return true
    else return false
}

// case 1:  //registrator
// case 2:  //admin
module.exports.LOGIN = Login
module.exports.LOGOUT = Delete
module.exports.CHECK_PERM = Check
module.exports.GET_USER = GetUser
module.exports.COOKIE_NAME = COOKIE_NAME
