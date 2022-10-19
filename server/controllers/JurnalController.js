const { poolPromise } = require('../modules/DB_MS')

class JurnalController {
    async getDopusk(req, res) {
        try {
            const { lang } = req.params
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_studentJournalVisit_typeDopusk ${Number(lang)}`)

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
                auth: true,
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false,
            })
        }
    }

    async getDopuskDetal(req, res) {
        try {
            const { lang } = req.params
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_studentJournalVisit_typeDopusk_detal ${lang}`)

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
                auth: true,
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false,
            })
        }
    }

    async getVidDopusk(req, res) {
        try {
            const { lang } = req.params
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_studentJournalVisit_vidDopusk ${lang}`)

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
                auth: true,
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false,
            })
        }
    }
}

module.exports = new JurnalController()
