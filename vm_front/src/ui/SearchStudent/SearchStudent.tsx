import React from 'react'
import { Button, Input, Loader, SelectCustom } from '../../components'
import { useHttp } from '../../hooks/useHttp'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { valueType } from '../../components/SelectCustom/ISelect'
import { ILoader, INoData, IStudents, IStudentsDetails } from './ISearchStudent'
import { Pencil } from '../../icons'
import styles from './styles.module.scss'

const SearchStudent: React.FC = () => {
    const { request } = useHttp()
    const { id_role, id_user, id_avn_user } = useTypeSelector(state => state.authReducer)
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { ws, isLoaderWs } = useTypeSelector(state => state.wsReducer)
    const [value, setValue] = React.useState<string>('')
    const [filterDetail, setFilterDetail] = React.useState<string>('')
    const [student, setStudent] = React.useState<IStudents[]>([])
    const [studentDetails, setStudentDetails] = React.useState<IStudentsDetails[]>([])
    // const [valueSelects, setValueSelects] = React.useState<IValueSelects>({
    //     v_year: { value: null, label: '' },
    //     v_ws: { value: null, label: '' }
    // })
    const [valueYear, setValueYear] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [valueWs, setValueWs] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [noData, setNoData] = React.useState<INoData>({
        student: false,
        studentDetail: false
    })
    const [idStudent, setIdStudent] = React.useState<number | null>(null)
    const [loader, setLoader] = React.useState<ILoader>({
        student: false,
        studentDetail: false
    })

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const changeYear = (v: valueType) => {
        setValueYear(v)

        if (student.length) {
            setStudent([])
        }

        if (studentDetails.length) {
            setStudentDetails([])
        }
    }

    const changeWs = (v: valueType) => {
        setValueWs(v)

        if (student.length) {
            setStudent([])
        }

        if (studentDetails.length) {
            setStudentDetails([])
        }
    }

    const searchAPI = async (e: React.FormEvent) => {
        e.preventDefault()

        if (noData.student) {
            setNoData({ ...noData, student: false })
        }

        if (filterDetail.length) {
            setFilterDetail('')
        }

        if (student.length) {
            setStudent([])
        }

        if (studentDetails.length) {
            setStudentDetails([])
        }

        setLoader({ ...loader, student: true })
        const { data } = await request('/teacher/search-student', 'POST', {
            value: value.trim(),
            id_role,
            id_avn_user,
            id_user,
            id_ws: valueWs.value,
            id_year: valueYear.value
        })
        setLoader({ ...loader, student: false })
        if (data.length) {
            return setStudent(data)
        }
        setNoData({ ...noData, student: true })
    }

    const getStudentDetails = async (id_student: number, id_group: number) => {
        setIdStudent(id_student)
        setLoader({ ...loader, studentDetail: true })

        if (noData.studentDetail) {
            setNoData({ ...noData, studentDetail: false })
        }
        const { data } = await request(
            `/teacher/search-student-detail?id_year=${valueYear.value}&id_ws=${valueWs.value}&id_role=${id_role}&id_avn_user=${id_avn_user}&id_user=${id_user}&id_group=${id_group}&id_student=${id_student}`
        )
        setStudentDetails(data)
        setLoader({ ...loader, studentDetail: false })
        if (data.length) {
            return setStudentDetails(data)
        }
        setNoData({ ...noData, studentDetail: true })
    }

    const studentDetailMemo = React.useMemo(() => {
        if (filterDetail == 'н/б') {
            const a = studentDetails.filter(item => item.otsenka == 'н/б')
            return a.map((item, index) => (
                <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.discipline}</td>
                    <td className="text-center">{item.short_name}</td>
                    <td className="text-center">{item.visitDate}</td>
                    <td className="text-center">{item.otsenka}</td>
                    <td className="text-center">{item.statusUpd ? <img style={{ cursor: 'pointer' }} src={Pencil} alt="pencil" /> : null}</td>
                </tr>
            ))
        }
        if (filterDetail.length) {
            const a = studentDetails.filter(item => item.short_name == filterDetail)
            return a.map((item, index) => (
                <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.discipline}</td>
                    <td className="text-center">{item.short_name}</td>
                    <td className="text-center">{item.visitDate}</td>
                    <td className="text-center">{item.otsenka}</td>
                    <td className="text-center">{item.statusUpd ? <img style={{ cursor: 'pointer' }} src={Pencil} alt="pencil" /> : null}</td>
                </tr>
            ))
        }
        return studentDetails.map((item, index) => (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{item.discipline}</td>
                <td className="text-center">{item.short_name}</td>
                <td className="text-center">{item.visitDate}</td>
                <td className="text-center">{item.otsenka}</td>
                <td className="text-center">{item.statusUpd ? <img style={{ cursor: 'pointer' }} src={Pencil} alt="pencil" /> : null}</td>
            </tr>
        ))
    }, [studentDetails, filterDetail])

    React.useEffect(() => {
        if (years.length) {
            // @ts-ignore
            const { id_a_year, p32 } = years.find(item => item.defaultValue == 1)
            setValueYear({ label: p32, value: id_a_year })
        }
    }, [years])

    React.useEffect(() => {
        if (ws.length) {
            // @ts-ignore
            const { id_ws, ws: a } = ws.find(item => item.defaultValue == 1)
            setValueWs({ label: a, value: id_ws })
        }
    }, [ws])

    return (
        <>
            <div className="box_container">
                <div className={styles.container}>
                    <div className="w-100" style={{ maxWidth: '250px' }}>
                        <SelectCustom
                            placeholder="Учебный год"
                            label="Учебный год"
                            value={valueYear}
                            options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                            onChange={changeYear}
                            loader={isLoaderYear}
                        />
                    </div>
                    <div className="w-100" style={{ maxWidth: '250px' }}>
                        <SelectCustom
                            placeholder="Полугодие"
                            label="Полугодие"
                            value={valueWs}
                            options={ws.map(item => ({ value: item.id_ws, label: item.ws }))}
                            onChange={changeWs}
                            loader={isLoaderWs}
                        />
                    </div>
                    <form className="w-100 flex justify-content-between gap-2 align-items-center align-items-end">
                        <div style={{ width: '100%', flex: 2 }}>
                            <Input
                                label="Найти"
                                placeholder="Введите ФИО студента"
                                readOnly={!valueYear.value || !valueWs.value}
                                value={value}
                                onChange={change}
                                className="w-100"
                                type="search"
                            />
                        </div>
                        <Button
                            className="bg-color-primary w-25"
                            disabled={!value.length || !valueYear.value || !valueWs.value}
                            onClick={searchAPI}
                            value="Поиск"
                        />
                    </form>
                </div>
            </div>

            <div className="flex justify-content-between mt-2 gap-2">
                <div className="box_container w-100">
                    {loader.student && (
                        <div className="flex justify-content-center mt-2">
                            <Loader />
                        </div>
                    )}
                    <div style={{ height: '64vh', overflowY: 'auto' }}>
                        {noData.student && <p className="text-center mt-2">Данные не найдены!</p>}
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className="text-center">№</th>
                                    <th className="text-center">ФИО</th>
                                    <th className="text-center">Группы</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.map((item, index) => (
                                    <tr style={{ cursor: 'pointer' }} onClick={getStudentDetails.bind(null, item.id_student, item.id_group)}>
                                        <td
                                            style={item.id_student == idStudent ? { backgroundColor: '#5488FF', color: 'white' } : {}}
                                            className="text-center">
                                            {index + 1}
                                        </td>
                                        <td
                                            style={
                                                item.id_student == idStudent ? { backgroundColor: '#5488FF', color: 'white', paddingLeft: '5px' } : {}
                                            }>
                                            {item.s_fio}
                                        </td>
                                        <td
                                            style={item.id_student == idStudent ? { backgroundColor: '#5488FF', color: 'white' } : {}}
                                            className="text-center">
                                            {item.rate} {item.groups} {item.faculty}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ minHeight: '200px' }} className="box_container w-100">
                    {loader.studentDetail && (
                        <div className="flex justify-content-center mt-2">
                            <Loader />
                        </div>
                    )}
                    <div style={{ height: '64vh', overflowY: 'auto' }}>
                        <div className="flex justify-content-around">
                            <div
                                style={
                                    filterDetail == 'Лк'
                                        ? { fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }
                                        : { fontSize: '12px', cursor: 'pointer' }
                                }
                                onClick={setFilterDetail.bind(null, 'Лк')}>
                                Лк
                            </div>
                            <div
                                style={
                                    filterDetail == 'Пр'
                                        ? { fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }
                                        : { fontSize: '12px', cursor: 'pointer' }
                                }
                                onClick={setFilterDetail.bind(null, 'Пр')}>
                                Пр
                            </div>
                            <div
                                style={
                                    filterDetail == 'Лб'
                                        ? { fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }
                                        : { fontSize: '12px', cursor: 'pointer' }
                                }
                                onClick={setFilterDetail.bind(null, 'Лб')}>
                                Лб
                            </div>
                            <div
                                style={
                                    filterDetail == 'н/б'
                                        ? { fontSize: '12px', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }
                                        : { fontSize: '12px', cursor: 'pointer' }
                                }
                                onClick={setFilterDetail.bind(null, 'н/б')}>
                                н/б
                            </div>
                            <div className="color-danger" style={{ fontSize: '12px', cursor: 'pointer' }} onClick={setFilterDetail.bind(null, '')}>
                                Сбросить
                            </div>
                        </div>
                        {noData.studentDetail && <p className="text-center mt-2">Данные не найдены!</p>}
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className="text-center">№</th>
                                    <th className="text-center">Дисциплина</th>
                                    <th className="text-center">Вид занятие</th>
                                    <th className="text-center">Дата</th>
                                    <th className="text-center">Оценка</th>
                                    <th className="text-center">Действие</th>
                                </tr>
                            </thead>
                            <tbody>{studentDetailMemo}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchStudent
