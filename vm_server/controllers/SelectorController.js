const { poolPromise } = require('../modules/DB_MS')

class SelectorController {
    async getYears(req, res) {
        try {
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_selectedYear`)

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

    async getWs(req, res) {
        try {
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_selectedWS`)

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

    async getFaculties(req, res) {
        try {
            const { id_user } = req.params
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_selectedFaculty
                                                                @id_user = ${id_user}`)

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

    async getSemester(req, res) {
        try {
            const { id_ws } = req.params
            const pool = await poolPromise()
            const { recordset } = await pool.query(`exec SP_selectedSemester
                                                                @id_ws = ${id_ws}`)

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

    async getFeduc(req, res) {
        try {
            const { id_user, id_faculty } = req.query
            const pool = await poolPromise()
            const { recordset } = await pool.query(
                `exec SP_selectedFeduc @id_user = ${id_user}, @id_faculty = ${id_faculty}`,
            )

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

    async getDirection(req, res) {
        try {
            const { id_year, id_semester, id_faculty, id_f_educ } = req.query
            const pool = await poolPromise()
            const { recordset } = await pool.query(
                `exec SP_selectedDirection 
                                @id_year = ${id_year},
					            @id_semester = ${id_semester},
					            @id_faculty = ${id_faculty},
					            @id_f_educ = ${id_f_educ}`,
            )

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

    async getSpecialities(req, res) {
        try {
            const { id_year, id_semester, id_faculty, id_f_educ, id_direction } = req.query
            const pool = await poolPromise()
            const { recordset } = await pool.query(
                `exec SP_selectedSpecial
                                        @id_year = ${id_year},
                                        @id_semester = ${id_semester},
                                        @id_faculty = ${id_faculty},
                                        @id_f_educ = ${id_f_educ},
                                        @id_direction = ${id_direction}`,
            )

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

    async getGroup(req, res) {
        try {
            const { id_year, id_semester, id_faculty, id_speciality } = req.query
            const pool = await poolPromise()
            const { recordset } = await pool.query(
                `exec SP_selectedVisitGroup
					                @id_year = ${id_year},
					                @id_semester = ${id_semester},
					                @id_faculty = ${id_faculty},
					                @id_speciality = ${id_speciality}`,
            )

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

    async getVidZanyatie(req, res) {
        try {
            const { id_year, id_semester, id_group } = req.query
            const pool = await poolPromise()
            const { recordset } = await pool.query(
                `exec SP_selectedVidZanyatii
					                @id_year = ${id_year},
					                @id_semester = ${id_semester},
					                @id_group = ${id_group}`,
            )

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

module.exports = new SelectorController()
