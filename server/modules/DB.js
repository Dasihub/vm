const DB_TYPE = process.env.DBTYPE
if (DB_TYPE === 'MS') {
    const {
        sql,
        poolPromise,
        getConnected,
        getPool,
        queryPool,
        connectWithLogin,
        connectWithCookie,
        myPool,
    } = require('./DB_MS')
    module.exports = {
        sql,
        getPool,
        poolPromise,
        getConnected,
        queryPool,
        connectWithLogin,
        connectWithCookie,
        myPool,
    }
}
if (DB_TYPE === 'PG') {
    const { query, getConnected } = require('./DB_PG')
    module.exports = {
        sql: () => false,
        poolPromise: () => false,
        getConnected: getConnected,
        queryPool: query,
        connectWithLogin: () => false,
        connectWithCookie: () => false,
    }
}
