const jwt = require('jsonwebtoken');

const send = require('../modules/send');
const { md5 } = require('../modules/utils');
const COOKIE = require('../routes/cookies');
const { sql, poolPromise, getConnected, connectWithLogin, myPool } = require('../modules/DB_MS');

const ACCESS_TOKEN_SECRET = '5c543f356c79a4717708dfdde1a872c9bc6a4369d2b419bc0a8c234ea9795df71727a375bea260aede25f87fa5d504c029eb7f9513f2792eea169cc5cf2d0db2';

class AuthController {
    // Оброботчик запроса для авторизации
    async login(req, res) {
        try {
            const { login, password } = req.body;
            const cryptoPass = md5(password);
            const pool = getConnected() ? await poolPromise() : await connectWithLogin(login, cryptoPass);
            if (pool == false) {
                return res.status(303).json({
                    message: req.t('incorrectAuth'),
                    type: 'warning',
                    data: [],
                    auth: false,
                });
            }

            const ID_PROG_ID = process.env.ID_PROG_ID;
            const { recordsets } = await pool
                .input('login', sql.NVarChar, login)
                .input('password', sql.NVarChar, cryptoPass)
                .input('prog', sql.VarChar, ID_PROG_ID)
                .execute(`SP_AVN_Login`);

            if (recordsets && recordsets.length && recordsets[0] && recordsets[0].length) {
                const { id_avn_user, id_user, id_role } = recordsets[0][0];
                const isLogIn = await COOKIE.LOGIN(req, res, id_role, id_avn_user, id_user);
                if (isLogIn) {
                    return res.status(200).json({
                        message: req.t('accessAuth'),
                        type: 'success',
                        data: { id_role, id_avn_user, id_user },
                        auth: true,
                    });
                }
            }

            res.status(303).json({
                message: req.t('incorrectAuth'),
                type: 'warning',
                data: [],
                auth: false,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false,
            });
        }
    }
    async check(req, res) {
        // Оброботчик запроса для аутентификации
        try {
            const IsAuthenticated = await COOKIE.CHECK_PERM(req, res);
            if (IsAuthenticated) {
                const user = await COOKIE.GET_USER(req);

                return res.status(200).json({
                    message: req.t('welcome'),
                    type: 'info',
                    data: user,
                    auth: true,
                });
            }
            res.status(401).json({
                message: req.t('enterLogin'),
                type: 'warn',
                data: {},
                auth: false,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false,
            });
        }
    }
    // Оброботчик запроса для выхода
    async logout(req, res) {
        try {
            const IsLogOut = await COOKIE.LOGOUT(req, res);
            res.clearCookie(COOKIE.COOKIE_NAME);

            res.status(200).json({
                logout: true,
                message: req.t('logout'),
                type: 'success',
                data: [],
            });
            // return send(res, true, `Вы вышли!`, false, 200, false, 'success')
        } catch (e) {
            res.clearCookie(COOKIE.COOKIE_NAME);
            console.log(e);
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false,
            });
        }
    }

    async userInfo(req, res) {
        try {
            const { id } = req.params;
            const pool = await poolPromise();
            let { recordset } = await pool.query(`exec SP_info_user  ${id}`);

            res.status(200).json({
                message: req.t('successFull'),
                type: 'success',
                data: recordset[0],
                auth: true,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false,
            });
        }
    }

    verifyAccessToken(token) {
        const decodedData = jwt.verify(token, ACCESS_TOKEN_SECRET);

        if (!decodedData) {
            return false;
        }

        return decodedData;
    }

    async token(req, res) {
        try {
            const { token } = req.query;
            console.log(token, 'token');
            if (token && token?.length) {
                const userData = this.verifyAccessToken(token);
                if (!userData) {
                    return res.status(401).json({
                        message: 'Такого пользователя не существует',
                        error: 'warn',
                        data: {},
                    });
                }
                const { id, uid, role, fullName } = userData.data;

                res.status(202).json({
                    data: userData.data,
                });

                // return resp.send({
                //     status: 0,
                //     error: 0,
                //     messages: ['Logged in successfully.'],
                //     result: {
                //         token,
                //         id,
                //         uid,
                //         role,
                //         fullName,
                //     },
                // });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false,
            });
        }
    }
}

module.exports = new AuthController();
