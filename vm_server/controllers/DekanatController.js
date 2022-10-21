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

module.exports = new DekanatController()
