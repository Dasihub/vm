// import exelJs from 'exceljs';
// import { saveAs } from 'file-saver';
// import { useGroupBy } from '../../hooks/useGroupBy';
//
// export const generateExelJournal = (report: any) => {
//     const reportGrouped = useGroupBy(report, 'dates');
//     console.log(reportGrouped, 'reportGrouped');
//
//     const workbook = new exelJs.Workbook();
//     workbook.creator = 'test';
//     workbook.lastModifiedBy = 'test';
//     workbook.created = new Date();
//     workbook.modified = new Date();
//
//     let sheet = workbook.addWorksheet('ЖУРНАЛ УЧЕТА ЗАНЯТИЙ');
//
//     sheet.getRow(2).values = ['1'];
//     sheet.getRow(2).font = { bold: true, size: 14 };
//
//     sheet.mergeCells('A2:I2');
//     sheet.mergeCells('A3:I3');
//     sheet.mergeCells('A4:I4');
//     sheet.mergeCells('A5:I5');
//     sheet.mergeCells('A6:I6');
//     sheet.mergeCells('A7:I7');
//
//     // sheet.getRow(9).values = ['№', Object.keys(reportGrouped), 'Всего н/б', 'Общая сумма', 'Средняя оценка'];
//     sheet.getRow(9).font = { bold: true };
//
//     // applicantList.map((applicant, index) => {
//     //     sheet.getRow(index + 10).values = [
//     //         index + 1,
//     //         applicant.shifr,
//     //         applicant.fio,
//     //         applicant.country,
//     //         applicant.reg_date ? dayjs(applicant.reg_date).format('DD.MM.YYYY') : null,
//     //         applicant.recom ? t('RecruitingPlanContent.modal.yes') : '',
//     //         applicant.exam,
//     //         applicant.otobran ? t('RecruitingPlanContent.modal.yes') : '',
//     //         applicant.status_mon,
//     //     ];
//     // });
//     sheet.columns = [
//         { key: 'number', width: 5 },
//         { key: 'shifr', width: 15 },
//         { key: 'fio', width: 35 },
//         { key: 'country', width: 15 },
//         { key: 'reg_date', width: 20 },
//         { key: 'recom', width: 10 },
//         { key: 'exam', width: 12 },
//         { key: 'selected_for_study', width: 22 },
//         { key: 'mon', width: 15 },
//     ];
//
//     const row = sheet.getRow(9);
//
//     row.fill = {
//         type: 'pattern',
//         pattern: 'solid',
//         fgColor: { argb: 'EDF2F7' },
//     };
//
//     row.eachCell((cell, rowNumber) => {
//         sheet.getColumn(rowNumber).alignment = {
//             vertical: 'middle',
//             horizontal: 'center',
//         };
//         sheet.getColumn(1).alignment = {
//             vertical: 'middle',
//             horizontal: 'center',
//         };
//         sheet.getColumn(rowNumber).alignment = {
//             vertical: 'middle',
//             horizontal: 'center',
//         };
//         sheet.getColumn(3).alignment = {
//             vertical: 'middle',
//             horizontal: 'left',
//         };
//     });
//
//     console.log(workbook.xlsx);
//
//     workbook.xlsx.writeBuffer().then(function (buffer) {
//         // done
//         console.log(buffer);
//
//         const blob = new Blob([buffer], { type: 'applicationi/xlsx' });
//         saveAs(blob, `ЖУРНАЛ УЧЕТА ЗАНЯТИЙ.xlsx`);
//     });
// };
