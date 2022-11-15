const { poolPromise } = require('../modules/DB_MS');

class TeacherController {
    async getDiscipline(req, res) {
        try {
            const { id_year, id_ws, id_teacher } = req.query;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                            exec LMS_discipline_id_teacher
                                              @id_w_s = ${id_ws},
                                              @id_teacher = ${id_teacher},
                                              @id_a_year = ${id_year}`);

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
            const { id_year, id_ws, id_teacher, id_discipline, isSelect, credit } = req.query;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                            exec LMS_semester_id_teacher
                                        @id_w_s = ${id_ws},
                                        @id_teacher = ${id_teacher},
                                        @id_discipline = ${id_discipline},
                                        @isSelect = ${isSelect},
				                        @Krdt = ${credit},
                                        @id_a_year = ${id_year}
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

    async getGroup(req, res) {
        try {
            const { id_year, id_ws, id_teacher, id_discipline, isSelect, credit, id_semester } = req.query;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                            exec LMS_group_id_teacher
                                        @id_w_s = ${id_ws},
                                        @id_teacher = ${id_teacher},
                                        @id_discipline = ${id_discipline},
                                        @isSelect = ${isSelect},
				                        @Krdt = ${credit},
				                        @id_semester = ${id_semester},
                                        @id_a_year = ${id_year}
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

    async getVidZanyatie(req, res) {
        try {
            const pool = await poolPromise();
            const { recordset } = await pool.query(`exec SP_GetVidZaniatiy`);

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

    async getStudentList(req, res) {
        try {
            const { id_year, id_teacher, id_discipline, isSelect, credit, id_semester, group, visitDate, id_vid_zaniatiy, timesCount, subgroup } = req.query;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`exec SP_jurnal_select
                                                                @year = ${id_year},
                                                                @semester = ${id_semester},
                                                                @discipline = ${id_discipline},
                                                                @kredits = ${credit},
                                                                @group = ${group},
                                                                @id_teacher = ${id_teacher},
                                                                @isSelect = ${isSelect},
                                                                @visitDate = '${visitDate}',
                                                                @id_vid_zaniatiy = ${id_vid_zaniatiy},
                                                                @timesCount = ${timesCount},
                                                                @groupSubgroup = ${subgroup ? subgroup : 0},
                                                                @subgroup = ${subgroup ? subgroup : 0}
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

    async getOtsenka(req, res) {
        try {
            const { role, date } = req.body;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`exec LMS_Otsenka_select
                                                                        @role = ${role},
                                                                        @date = '${date}'
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

    async getSubGroupStudents(req, res) {
        try {
            const { year, semester, discipline, credit, group, id_teacher, id_vid_zaniatiy } = req.query;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                                    exec SP_jurnal_select_subgroup
                                                @year = ${year},
                                                @semester = ${semester},
                                                @discipline = ${discipline},
                                                @kredits = ${credit},
                                                @group = ${group},
                                                @id_teacher = ${id_teacher},
                                                @id_vid_zaniatiy = ${id_vid_zaniatiy}
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

    async updateOtsenka(req, res) {
        try {
            const {
                id_teacher,
                id_student,
                id_discipline,
                credit,
                visitDate,
                isVisited,
                id_groupOrPorok,
                isPotok,
                id_year,
                id_semesterOrWs,
                id_vid_zaniatiy,
                timesCount,
                id_otsenka,
                typeGroup,
                subgroup,
            } = req.body;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                                        exec SP_StudentJournalVisit_Update
                                                 @id_teacher = ${id_teacher}
                                                ,@id_student = ${id_student}
                                                ,@id_discipline = ${id_discipline}
                                                ,@credits = ${credit}
                                                ,@visitDate = '${visitDate}'
                                                ,@isVisited = ${isVisited}
                                                ,@id_groupOrPorok = ${id_groupOrPorok}
                                                ,@isPotok = ${isPotok}
                                                ,@id_a_year = ${id_year}
                                                ,@id_semesterOrWs = ${id_semesterOrWs}
                                                ,@id_vid_zaniatiy = ${id_vid_zaniatiy}
                                                ,@timesCount = ${timesCount}
                                                ,@id_time = -1
                                                ,@id_otsenka = ${id_otsenka}
                                                ,@typeGroup = ${typeGroup ? typeGroup : 0}
                                                ,@supgroup = ${subgroup ? subgroup : 0}
            `);

            res.status(200).json({
                message: 'Данные успешно обновлены',
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

    async postOtsenko(req, res) {
        try {
            const {
                id_teacher,
                id_discipline,
                credit,
                visitDate,
                isVisited,
                id_groupOrPorok,
                isPotok,
                id_year,
                id_semesterOrWs,
                id_vid_zaniatiy,
                timesCount,
                typeGroup,
                subgroup,
            } = req.body;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                                        exec SP_StudentJournalVisit_Insert
	                                                         @id_teacher = ${id_teacher}
	                                                        ,@id_discipline = ${id_discipline}
	                                                        ,@credits = ${credit}
	                                                        ,@visitDate = '${visitDate}'
	                                                        ,@isVisited = ${isVisited}
	                                                        ,@id_groupOrPorok = ${id_groupOrPorok}
	                                                        ,@isPotok = ${isPotok}
	                                                        ,@id_a_year	= ${id_year}
	                                                        ,@id_semesterOrWs = ${id_semesterOrWs}
	                                                        ,@id_vid_zaniatiy = ${id_vid_zaniatiy}
	                                                        ,@timesCount = ${timesCount}
	                                                        ,@id_time = -1
                                                            ,@typeGroup = ${typeGroup}
                                                            ,@supgroup  = ${subgroup ? subgroup : 0}
            `);

            if (recordset[0]?.sms) {
                return res.status(200).json({
                    message: 'Данные успешно сохранены',
                    type: 'success',
                    data: recordset,
                    auth: true,
                });
            }

            res.status(200).json({
                message: 'Данные успешно не сохранены',
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

    async postSubGroup(req, res) {
        try {
            const { year, id_student, discipline, credit, subgroup, id_teacher, id_vid_zaniatiy, id_semesterOrWs, id_groupOrPorok, studentSubgroup } = req.body;
            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                                    exec SP_StudentJournalVisit_subgroup_Insert
			                                            	@id_a_year = ${year}
			                                               ,@id_semesterOrWs  = ${id_semesterOrWs}
			                                               ,@id_discipline = ${discipline}
			                                               ,@credits = ${credit}
			                                               ,@id_vid_zaniatiy = ${id_vid_zaniatiy}
			                                               ,@id_groupOrPorok = ${id_groupOrPorok}
			                                               ,@id_teacher = ${id_teacher}
			                                               ,@id_student = ${id_student}
			                                               ,@subgroup = ${subgroup}
			                                               ,@id_studentJournalVisit_subgroup = ${studentSubgroup ? studentSubgroup : 0}
          `);

            if (recordset[0]?.sms) {
                return res.status(200).json({
                    message: 'Данные успешно сохранены',
                    type: 'success',
                    data: recordset,
                    auth: true,
                });
            }

            res.status(200).json({
                message: 'Данные не сохранены',
                type: 'warning',
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

    async searchJournal(req, res) {
        try {
            const { value, id_year, id_ws, id_role, id_avn_user, id_user } = req.body;

            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                                            exec SP_jurnal_find
                                                @id_a_year = ${id_year},
                                                @id_w_s = ${id_ws},
                                                @s_fio= '${value}',
                                                @id_role = ${id_role},
                                                @id_avn_user = ${id_avn_user},
                                                @id_user= ${id_user}
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

    async searchJournalDetails(req, res) {
        try {
            const { id_year, id_ws, id_group, id_role, id_avn_user, id_user, id_student } = req.query;

            const pool = await poolPromise();
            const { recordset } = await pool.query(`
                                            exec SP_jurnal_find_detal
                                                        @id_a_year = ${id_year},
                                                        @id_w_s = ${id_ws},
                                                        @id_group = ${id_group},
                                                        @id_student = ${id_student},
                                                        @id_role = ${id_role},
                                                        @id_avn_user = ${id_avn_user},
                                                        @id_user = ${id_user}
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

module.exports = new TeacherController();
