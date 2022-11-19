const { poolPromise } = require('../modules/DB_MS')

class DekanatController {
    async getStudents(req, res) {
        try {
            const { id_year, id_ws, id_semester, id_faculty, id_f_educ, id_group, id_vid_zaniatiy } = req.query
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_visit_student_group
                                                                        @id_year = ${id_year},
                                                                        @id_ws = ${id_ws},
                                                                        @id_semester =${id_semester},
                                                                        @id_faculty =${id_faculty},
                                                                        @id_f_educ =${id_f_educ},
                                                                        @id_group =${id_group},
                                                                        @id_vid_zaniatiy =${id_vid_zaniatiy}`)

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
                auth: true
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false
            })
        }
    }

    async getAccess(req, res) {
        try {
            const { id_avn_login } = req.params
            const pool = await poolPromise()
            const { recordset } = await pool.query(`
            exec SP_AVN_PROG_PERM
                        @id_avn_login = ${id_avn_login},
                        @prog = '${process.env.ID_PROG_ID}'`)

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset[0],
                auth: true
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false
            })
        }
    }

    async getWorking(req, res) {
        try {
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_jurnal_working_off`)

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
                auth: true
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false
            })
        }
    }

    async journalUpdate(req, res) {
        try {
            const {
                id,
                id_role,
                id_user,
                id_otsenka_old,
                id_otsenka_new,
                cipher,
                id_working_old,
                id_working_new,
                description
            } = req.body
            const pool = await poolPromise()
            const { recordset } = await pool.query(`
                        exec SP_jurnal_dekanat_Upd
                                               @id = ${id},
                                               @id_otsenka_old = ${id_otsenka_old},
                                               @id_otsenka_new = ${id_otsenka_new},
                                               @id_working_off_old = ${id_working_old},
                                               @id_working_off_new = ${id_working_new},
                                               @shifr = '${cipher}',
                                               @description ='${description}',
                                               @id_role = ${id_role},
                                               @id_user = ${id_user}
            `)

            res.status(200).json({
                message: 'Данные успешно обновлены',
                type: 'success',
                data: recordset,
                auth: true
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: req.t('error'),
                type: 'error',
                data: [],
                auth: false
            })
        }
    }
}

module.exports = new DekanatController()
