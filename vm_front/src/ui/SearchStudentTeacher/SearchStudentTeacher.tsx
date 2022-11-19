import React from 'react'
import { Button, Input, Loader, SelectCustom } from '../../components'
import { useHttp } from '../../hooks/useHttp'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { valueType } from '../../components/SelectCustom/ISelect'
import { ILoader, INoData, IStudents } from './ISearchStudentTeacher'
import styles from './styles.module.scss'
import Modal from './Modal/Modal'
import { IGrade } from '../../models/IGrade'
import { IStudentsDetails, IWorking } from '../SearchStudent/ISearchStudent'
import dayjs from 'dayjs'
import { IRes } from '../../models/IModels'
import { useMessage } from '../../hooks/useMessage'
import RenderTable from './RenderTable/RenderTable'
import { isScreen } from '../../config/data'
import Collapsible from 'react-collapsible'

const styleFilter = {
    fontSize: '12px',
    fontWeight: 'bold',
    textDecoration: 'underline',
    cursor: 'pointer'
}

const time = 200

const SearchStudentTeacher: React.FC = () => {
    const { request } = useHttp()
    const toast = useMessage()
    const { id_role, id_user, id_avn_user } = useTypeSelector(state => state.authReducer)
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { ws, isLoaderWs } = useTypeSelector(state => state.wsReducer)
    const [value, setValue] = React.useState<string>('')
    const [filterDetail, setFilterDetail] = React.useState<string>('')
    const [student, setStudent] = React.useState<IStudents[]>([])
    const [studentDetails, setStudentDetails] = React.useState<IStudentsDetails[]>([])
    const [isModal, setIsModal] = React.useState<boolean>(false)
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
    const [idOtsenka, setIdOtsenka] = React.useState<number | null>(null)
    const [idGroup, setIdGroup] = React.useState<number | null>(null)
    const [id, setId] = React.useState<number | null>(null)
    const [grade, setGrade] = React.useState<IGrade[]>([])
    const [working, setWorking] = React.useState<string>('')
    const [status, setStatus] = React.useState<string>('')

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

    const getOtsenka = async () => {
        const { data } = await request('/teacher/get-otsenka', 'POST', {
            role: id_role,
            date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        setGrade([...data, { id_otsenka: 0, otsenka: 'д', otsenka_ball: 0 }])
    }

    const getStudentDetails = async (id_student: number | null, id_group: number | null) => {
        setIdStudent(id_student)
        setIdGroup(id_group)
        setLoader({ ...loader, studentDetail: true })

        if (noData.studentDetail) {
            setNoData({ ...noData, studentDetail: false })
        }
        const { data } = await request(
            `/teacher/search-student-detail?id_year=${valueYear.value}&id_ws=${
                valueWs.value
            }&id_role=${id_role}&id_avn_user=${id_avn_user}&id_user=${id_user}&id_group=${id_group}&id_student=${id_student}&id_semester=${0}`
        )
        setStudentDetails(data)
        setLoader({ ...loader, studentDetail: false })
        if (data.length) {
            return setStudentDetails(data)
        }
        setNoData({ ...noData, studentDetail: true })
    }

    const hideModal = () => {
        document.body.style.overflowY = 'visible'
        setIsModal(false)
    }

    const showModal = (id_otsenka: number, id_: number, paymentStatus: string, working_off: string) => {
        setStatus(paymentStatus)
        setWorking(working_off)
        setIdOtsenka(id_otsenka)
        setId(id_)
        document.body.style.overflowY = 'hidden'
        setIsModal(true)
    }

    const updateJournal = async (id_otsenka_new: number | string | null) => {
        const { message, type }: IRes = await request('/teacher/journal', 'PUT', {
            id_role,
            id_user,
            id_otsenka_old: idOtsenka,
            id_otsenka_new,
            id
        })
        toast(message, type)
        hideModal()
        getStudentDetails(idStudent, idGroup)
    }

    const studentDetailMemo = React.useMemo(() => {
        if (filterDetail == 'н/б') {
            const a = studentDetails.filter(item => item.otsenka == 'н/б')
            return a.map((item, index) => <RenderTable key={item.id} item={item} index={index} showModal={showModal} />)
        }
        if (filterDetail.length) {
            const a = studentDetails.filter(item => item.short_name == filterDetail)
            return a.map((item, index) => <RenderTable key={item.id} item={item} index={index} showModal={showModal} />)
        }
        return studentDetails.map((item, index) => (
            <RenderTable key={item.id} item={item} index={index} showModal={showModal} />
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
        getOtsenka()
    }, [id_role])

    React.useEffect(() => {
        if (ws.length) {
            // @ts-ignore
            const { id_ws, ws: a } = ws.find(item => item.defaultValue == 1)
            setValueWs({ label: a, value: id_ws })
        }
    }, [ws])

    return (
        <>
            {isModal && (
                <Modal
                    working={working}
                    status={status}
                    idOtsenka={idOtsenka}
                    hideModal={hideModal}
                    updateJournal={updateJournal}
                    grade={grade}
                />
            )}
            <div className="box_container">
                <div className={styles.container}>
                    <div className={styles.selects}>
                        <SelectCustom
                            placeholder="Учебный год"
                            label="Учебный год"
                            value={valueYear}
                            options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                            onChange={changeYear}
                            loader={isLoaderYear}
                        />
                    </div>
                    <div className={styles.selects}>
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

            {isScreen ? (
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
                                        <tr
                                            style={{ cursor: 'pointer' }}
                                            onClick={getStudentDetails.bind(null, item.id_student, item.id_group)}>
                                            <td
                                                style={
                                                    item.id_student == idStudent
                                                        ? { backgroundColor: '#5488FF', color: 'white' }
                                                        : {}
                                                }
                                                className="text-center">
                                                {index + 1}
                                            </td>
                                            <td
                                                style={
                                                    item.id_student == idStudent
                                                        ? {
                                                              backgroundColor: '#5488FF',
                                                              color: 'white',
                                                              paddingLeft: '5px'
                                                          }
                                                        : {}
                                                }>
                                                {item.s_fio}
                                            </td>
                                            <td
                                                style={
                                                    item.id_student == idStudent
                                                        ? { backgroundColor: '#5488FF', color: 'white' }
                                                        : {}
                                                }
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
                                            ? {
                                                  fontSize: '12px',
                                                  fontWeight: 'bold',
                                                  textDecoration: 'underline',
                                                  cursor: 'pointer'
                                              }
                                            : { fontSize: '12px', cursor: 'pointer' }
                                    }
                                    onClick={setFilterDetail.bind(null, 'Лк')}>
                                    Лк
                                </div>
                                <div
                                    style={filterDetail == 'Пр' ? styleFilter : { fontSize: '12px', cursor: 'pointer' }}
                                    onClick={setFilterDetail.bind(null, 'Пр')}>
                                    Пр
                                </div>
                                <div
                                    style={filterDetail == 'Лб' ? styleFilter : { fontSize: '12px', cursor: 'pointer' }}
                                    onClick={setFilterDetail.bind(null, 'Лб')}>
                                    Лб
                                </div>
                                <div
                                    style={
                                        filterDetail == 'н/б'
                                            ? styleFilter
                                            : {
                                                  fontSize: '12px',
                                                  cursor: 'pointer'
                                              }
                                    }
                                    onClick={setFilterDetail.bind(null, 'н/б')}>
                                    н/б
                                </div>
                                <div
                                    className="color-danger"
                                    style={{ fontSize: '12px', cursor: 'pointer' }}
                                    onClick={setFilterDetail.bind(null, '')}>
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
                                        <th className="text-center">Оплачено</th>
                                        <th className="text-center">Тип отработки</th>
                                        <th className="text-center">Действие</th>
                                    </tr>
                                </thead>
                                <tbody>{studentDetailMemo}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="container_card_question">
                        {student.map(item => (
                            <div
                                className={styles.card}
                                onClick={getStudentDetails.bind(null, item.id_student, item.id_group)}>
                                <div className="answers">
                                    <h3>Ф.И.О: {item.s_fio}</h3>
                                    <h3>Группа: {item.groups}</h3>
                                    {loader.studentDetail && (
                                        <div className="flex justify-content-center mt-2">
                                            <Loader sm={true} />
                                        </div>
                                    )}
                                    {noData.studentDetail && <p className="text-center mt-2">Данные не найдены!</p>}
                                    {studentDetails.map(item => (
                                        <div key={item.id} className={styles.card}>
                                            <div className="flex justify-content-between mt-1 gap-1">
                                                <div className="color-primary">Дисциплина</div>
                                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>
                                                    {item.discipline}
                                                </div>
                                            </div>
                                            <div className="flex justify-content-between mt-1">
                                                <div className="color-primary">Вид занятие</div>
                                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>
                                                    {item.short_name}
                                                </div>
                                            </div>
                                            <div className="flex justify-content-between mt-1 gap-1">
                                                <div className="color-primary">Преподаватель</div>
                                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>{item.t_fio}</div>
                                            </div>
                                            <div className="flex justify-content-between mt-1 gap-1">
                                                <div className="color-primary">Дата</div>
                                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>
                                                    {item.visitDate}
                                                </div>
                                            </div>
                                            <div className="flex justify-content-between mt-1 gap-1">
                                                <div className="color-primary">Оценка</div>
                                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>
                                                    {item.otsenka}
                                                </div>
                                            </div>
                                            <div className="flex justify-content-between mt-1 gap-1">
                                                <div className="color-primary">Тип отработки</div>
                                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>
                                                    {item.working_off}
                                                </div>
                                            </div>
                                            <div className="flex justify-content-between mt-1 gap-1">
                                                <div className="color-primary">Оплачено</div>
                                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>
                                                    {item.paymentStatus}
                                                </div>
                                            </div>
                                            <div className="flex justify-content-between mt-1 gap-1">
                                                {item.statusUpd ? (
                                                    <Button
                                                        value="Изменить"
                                                        onClick={showModal.bind(
                                                            null,
                                                            item.id_otsenka,
                                                            item.id,
                                                            item.paymentStatus,
                                                            item.working_off
                                                        )}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default SearchStudentTeacher
