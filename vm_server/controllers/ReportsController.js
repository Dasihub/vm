const { poolPromise } = require('../modules/DB_MS')

//id_ws > semester
class ReportsController {
    async getJournal(req, res) {
        try {
            const { year, id_ws, discipline, credit, group, id_teacher, id_vid_zaniatiy, isSelect } = req.query
            const pool = await poolPromise()
            const { recordset } = await pool.query(`
                                 exec LMS_JournalVisit_select
                                            @id_year = ${year}
                                            ,@id_ws = ${id_ws}
                                            ,@id_teacher= ${id_teacher}
                                            ,@id_vid_zaniatiy = ${id_vid_zaniatiy}
                                            ,@id_discipline = ${discipline}
                                            ,@Krdt = ${credit}
                                            ,@id_group = ${group}
                                            ,@isSelect = ${isSelect}
`)

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

    async deleteOtsenko(req, res) {
        try {
            const {
                id_teacher,
                id_discipline,
                credit,
                visitDate,
                id_groupOrPorok,
                id_year,
                id_ws,
                id_semesterOrWs,
                id_vid_zaniatiy,
                timesCount
            } = req.query
            const pool = await poolPromise()
            const { recordset } = await pool.query(`
            exec LMS_JournalVisit_select_delete
                                    @id_a_year = ${id_year},
                                    @id_w_s = ${id_ws},
                                    @id_semesterOrWs = ${id_semesterOrWs},
                                    @id_groupOrPorok = ${id_groupOrPorok},
                                    @id_vid_zaniatiy = ${id_vid_zaniatiy},
                                    @timesCount = ${timesCount},
                                    @id_teacher = ${id_teacher},
                                    @id_discipline = ${id_discipline},
                                    @Krdt = ${credit},
                                    @visitDate = '${visitDate}'
            `)

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

    async getAdmission(req, res) {
        try {
            const { id } = req.params
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_jurnal_dopusk ${id}`)

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
}

module.exports = new ReportsController()
