require('dotenv').config()

const { LOGIN, LOGOUT, CHECK_PERM, GET_USER, COOKIE_NAME } = require('../modules/cookie_MS')

module.exports = {
    LOGIN,
    LOGOUT,
    CHECK_PERM,
    GET_USER,
    COOKIE_NAME,
}
