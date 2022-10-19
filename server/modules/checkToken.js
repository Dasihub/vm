const COOKIE = require('../routes/cookies.js')
require('dotenv').config()

async function checkToken(req, res, next) {
    const IsAuthenticated = await COOKIE.CHECK_PERM(req, res)
    if (IsAuthenticated) {
        return next()
    }
    res.status(401).json({
        message: req.t('notAuth'),
        type: 'error',
        data: [],
        auth: false,
    })
}

module.exports = checkToken
