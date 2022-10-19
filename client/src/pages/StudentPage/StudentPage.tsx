import React from 'react'
import { Loader, SelectCustom } from '../../components'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { IDiscipline, IJournal, ILoader, ISemester, ITeacher, IValueSelect } from './IStudent'
import { valueType } from '../../components/SelectCustom/ISelect'
import { useHttp } from '../../hooks/useHttp'

const StudentPage: React.FC = () => {
    const { request } = useHttp()
    const { ws } = useTypeSelector(state => state.wsReducer)
    const { lang } = useTypeSelector(state => state.langReducer)
    const { years } = useTypeSelector(state => state.yearReducer)
    const { id_user } = useTypeSelector(state => state.authReducer)
    const [disciplines, setDisciplines] = React.useState<IDiscipline[]>([])
    const [discipline, setDiscipline] = React.useState<IDiscipline>()
    const [semester, setSemester] = React.useState<ISemester[]>([])
    const [teachers, setTeachers] = React.useState<ITeacher[]>([])
    const [journal, setJournal] = React.useState<IJournal[]>([])
    const [loader, setLoader] = React.useState<ILoader>({
        discipline: false,
        semester: false,
        teacher: false,
        journal: false
    })
    const [valueSelects, setValueSelects] = React.useState<IValueSelect>({
        v_year: { value: null, label: '' },
        v_ws: { value: null, label: '' },
        v_semester: { value: null, label: '' },
        v_teacher: { value: null, label: '' }
    })

    const changeYear = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_year: v })
    }

    const changeWs = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_ws: v })
        getDiscipline(v.value)
    }

    const changeDiscipline = (v: valueType) => {
        const one = disciplines.find(item => item.id_discipline === v.value)
        setDiscipline(one)
        getSemester(v.value)
    }

    const changeSemester = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_semester: v })
        getTeacher(v.value)
    }

    const changeTeacher = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_teacher: v })
        getJournal(v.value)
    }

    const getDiscipline = async (ws: null | number | string) => {
        setLoader({ ...loader, discipline: true })
        const { data } = await request(`/student/discipline/?id_year=${v_year.value}&id_ws=${ws}&id_group=${7175}&id_student=${59527}&lang=${lang}`)
        setDisciplines(data)
        setLoader({ ...loader, discipline: false })
    }

    const getSemester = async (id_discipline: null | number | string) => {
        setLoader({ ...loader, semester: true })
        const { data } = await request(
            `/student/semester/?id_year=${v_year.value}&id_ws=${
                v_ws.value
            }&id_group=${7175}&id_student=${59527}&id_discipline=${id_discipline}&lang=${lang}`
        )
        setSemester(data)
        setLoader({ ...loader, semester: false })
    }

    const getTeacher = async (id_semester: null | number | string) => {
        setLoader({ ...loader, teacher: true })
        const { data } = await request(
            `/student/teacher/?id_year=${v_year.value}&id_ws=${v_ws.value}&id_group=${7175}&id_student=${59527}&id_discipline=${
                discipline?.id_discipline
            }&id_semester=${id_semester}&is_select=${discipline?.isSelect}&lang=${lang}`
        )
        setTeachers(data)
        setLoader({ ...loader, teacher: false })
    }

    const getJournal = async (id_teacher: null | number | string) => {
        setLoader({ ...loader, journal: true })
        const { data } = await request(
            `/student/journal/?id_year=${v_year.value}&id_ws=${v_ws.value}&id_group=${7175}&id_student=${59527}&id_discipline=${
                discipline?.id_discipline
            }&id_semester=${v_semester.value}&is_select=${discipline?.isSelect}&credit=${discipline?.credits}&id_teacher=${id_teacher}&lang=${lang}`
        )
        setJournal(data)
        setLoader({ ...loader, journal: false })
    }

    React.useEffect(() => {
        if (years.length) {
            // @ts-ignore
            const { id_a_year, p32 } = years.find(item => item.defaultValue == 1)
            setValueSelects({ ...valueSelects, v_year: { value: id_a_year, label: p32 } })
        }
    }, [years])

    const { v_year, v_ws, v_semester, v_teacher } = valueSelects

    return (
        <>
            <div className="flex justify-content-between gap-2">
                <div className="w-100">
                    <SelectCustom
                        placeholder="Учебный год"
                        label="Учебный год"
                        value={v_year}
                        options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                        onChange={changeYear}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Полугодие"
                        label="Полугодие"
                        value={v_ws.value ? v_ws : ''}
                        options={ws.map(item => ({ value: item.id_ws, label: item.ws }))}
                        onChange={changeWs}
                        isDisabled={!v_year.value}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Дисциплина"
                        label="Дисциплина"
                        value={discipline?.id_discipline ? { value: discipline?.id_discipline, label: discipline?.discipline } : ''}
                        options={disciplines.map(item => ({ value: item.id_discipline, label: item.discipline }))}
                        loader={loader.discipline}
                        onChange={changeDiscipline}
                        isDisabled={!v_ws.value}
                    />
                </div>
            </div>
            <div className="flex justify-content-between gap-2">
                <div className="w-100">
                    <SelectCustom
                        placeholder="Семестр"
                        label="Семестр"
                        value={v_semester.value ? v_semester : ''}
                        options={semester.map(item => ({ value: item.id_semester, label: item.p43 }))}
                        loader={loader.semester}
                        onChange={changeSemester}
                        isDisabled={!discipline?.id_discipline}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Преподаватель"
                        label="Преподаватель"
                        value={v_teacher.value ? v_teacher : ''}
                        options={teachers.map(item => ({ value: item.id_teacher, label: item.t_fio }))}
                        loader={loader.teacher}
                        onChange={changeTeacher}
                        isDisabled={!discipline?.id_discipline}
                    />
                </div>
            </div>
            {loader.journal ? (
                <div className="flex justify-content-center mt-2">
                    <Loader />
                </div>
            ) : journal.length ? (
                <div className="overflow-auto mt-4" style={{ maxHeight: '900px', minHeight: '400px' }}>
                    <table className="table">
                        <thead className="bg-light">
                            <tr>
                                <th>№</th>
                                <th>ФИО</th>
                                <th style={{ width: '200px' }}>Оценка</th>
                            </tr>
                        </thead>
                        <tbody>
                            {journal.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.id_studentJournalVisit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : null}
        </>
    )
}

export default StudentPage
