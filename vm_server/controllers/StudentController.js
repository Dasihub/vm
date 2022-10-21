const { poolPromise } = require('../modules/DB_MS');

class StudentController {
    async getDiscipline(req, res) {
        try {
            const { lang, id_year, id_ws, id_group, id_student } = req.query;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                        exec SP_discipline_StudentJV
                                        @language = ${lang},
                                        @id_year = ${id_year},
                                        @id_ws = ${id_ws},
                                        @id_group = ${id_group},
                                        @id_student = ${id_student}
            `);

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
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

    async getSemester(req, res) {
        try {
            const { lang, id_year, id_ws, id_group, id_student, id_discipline } = req.query;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                        exec SP_semester_StudentJV
                                           @language = ${lang},
                                           @id_year = ${id_year},
                                           @id_ws = ${id_ws},
                                           @id_group = ${id_group},
                                           @id_student = ${id_student},
                                           @id_discipline = ${id_discipline}
            `);

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
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

    async getTeacher(req, res) {
        try {
            const { lang, id_year, id_ws, id_group, id_student, id_discipline, is_select, id_semester } = req.query;

            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                        exec SP_teacher_StudentJV
                                           @language = ${lang},
                                           @id_year = ${id_year},
                                           @id_ws = ${id_ws},
                                           @id_group = ${id_group},
                                           @id_student = ${id_student},
                                           @id_discipline = ${id_discipline},
                                           @id_semester = ${id_semester},
                                           @isPotok = ${is_select}
            `);

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
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

    async getJournal(req, res) {
        try {
            const { lang, id_year, id_ws, id_group, id_student, id_discipline, is_select, id_semester, credit, id_teacher } = req.query;

            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                        exec SP_Journal_StudentJV
                                        @language = ${lang},
                                        @id_year = ${id_year},
                                        @id_ws = ${id_ws},
                                        @id_group = ${id_group},
                                        @id_student = ${id_student},
                                        @id_discipline = ${id_discipline},
                                        @isPotok  = ${is_select},
                                        @credits  = ${credit},
                                        @id_teacher = ${id_teacher},
                                        @id_semesterOrWs = ${id_semester}
            `);

            res.status(200).json({
                message: 'Данные успешно получены',
                type: 'success',
                data: recordset,
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
}

module.exports = new StudentController();
