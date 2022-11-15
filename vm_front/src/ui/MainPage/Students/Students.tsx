import React from 'react'
import { IStudentsProps } from './IStudents'
import { useGroupBy } from '../../../hooks/useGroupBy'

const Students: React.FC<IStudentsProps> = ({ students, showModal }) => {
    // const studentsFiltered = students.filter(x => x.visitDate !== null)
    const educGrouped = useGroupBy(students, 'discipline')
    const studentGrouped = useGroupBy(students, 's_fio')

    Object.keys(educGrouped).forEach(key => {
        educGrouped[key] = useGroupBy(educGrouped[key], 'visitDate')
    })

    if (!students.length) {
        return <h4 className="text-center mt-2">Нет данных</h4>
    }

    return (
        <div className="overflow-auto mt-4 box_container" style={{ maxHeight: '900px' }}>
            <table className="table">
                <thead className="bg-light" style={{ position: 'sticky', top: '2px' }}>
                    <tr style={{ fontSize: '14px' }}>
                        <th className="th" rowSpan={2}>
                            №
                        </th>
                        <th className="th" rowSpan={2}>
                            Студент
                        </th>
                        {Object.keys(educGrouped)
                            .sort()
                            .map(idDiscipline => (
                                <th className="th" rowSpan={1} colSpan={Object.keys(educGrouped[idDiscipline]).length} key={'disc' + idDiscipline}>
                                    {educGrouped[idDiscipline][Object.keys(educGrouped[idDiscipline])[0]][0].discipline}
                                    <div style={{ fontSize: '14px' }}>
                                        {educGrouped[idDiscipline][Object.keys(educGrouped[idDiscipline])[0]][0].t_fio}
                                    </div>
                                </th>
                            ))}
                    </tr>
                    <tr>
                        {Object.keys(educGrouped)
                            .sort()
                            .map(idDiscipline => {
                                return Object.keys(educGrouped[idDiscipline])
                                    .sort()
                                    .map(idDate => (
                                        <th rowSpan={1} colSpan={1} key={'date' + idDate}>
                                            {educGrouped[idDiscipline][idDate][0].visitDate}
                                            <div style={{ fontSize: '14px' }}>{educGrouped[idDiscipline][idDate][0].t_fio}</div>
                                        </th>
                                    ))
                            })}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(studentGrouped)
                        .sort()
                        .map((idStudent, index) => {
                            return (
                                <tr key={'student' + idStudent}>
                                    <td className="text-center">{index + 1}</td>
                                    <td> {studentGrouped[idStudent][0]?.s_fio}</td>
                                    {Object.keys(educGrouped)
                                        .sort()
                                        .map(idDiscipline => {
                                            return Object.keys(educGrouped[idDiscipline])
                                                .sort()
                                                .map((idDate, indexDate) => (
                                                    <td
                                                        key={'date' + indexDate}
                                                        onClick={showModal}
                                                        className={
                                                            educGrouped[idDiscipline][idDate].find((x: any) => x.s_fio == idStudent)?.id_otsenka == 6
                                                                ? 'text-center bg-color-danger pointer color-light'
                                                                : 'text-center'
                                                        }>
                                                        {educGrouped[idDiscipline][idDate].find((x: any) => x.s_fio == idStudent)?.otsenka}
                                                    </td>
                                                ))
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default Students
