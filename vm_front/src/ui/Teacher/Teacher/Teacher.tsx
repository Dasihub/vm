import React from 'react'
import { StudentsList } from '../../index'
import { Button, Input, Loader, ModalWindow, SelectCustom } from '../../../components'
import RenderSubGroup from '../RenderSubGroup/RenderSubGroup'
import { amount, subGroup, typeGroup } from '../../../config/data'
import { useHttp } from '../../../hooks/useHttp'
import { useMessage } from '../../../hooks/useMessage'
import { useTypeSelector } from '../../../hooks/useTypeSelector'
import { IDiscipline, IGrade, ILoader, ISemester, IStudentList, ISubgroupStudent, ITeacherTabProps, IValueSelects } from './ITeacher'
import { valueType } from '../../../components/SelectCustom/ISelect'
import dayjs from 'dayjs'
import { IRes } from '../../../models/IModels'
import styles from './style.module.scss'

const Teacher: React.FC<ITeacherTabProps> = ({ toReport, groups, setGroups, setVidZanyatie, vidZanyatie }) => {
    const { request } = useHttp()
    const toast = useMessage()
    const { id_user, id_role } = useTypeSelector(state => state.authReducer)
    const [disciplines, setDisciplines] = React.useState<IDiscipline[]>([])
    const [discipline, setDiscipline] = React.useState<IDiscipline>()
    const [semester, setSemester] = React.useState<ISemester[]>([])
    // const [groups, setGroups] = React.useState<IGroups[]>([])
    // const [vidZanyatie, setVidZanyatie] = React.useState<IVidZanyatie[]>([])
    const [studentList, setStudentList] = React.useState<IStudentList[]>([])
    const [grade, setGrade] = React.useState<IGrade[]>([])
    const [isModal, setIsModal] = React.useState<boolean>(false)
    const [subgroupStudents, setSubgroupStudents] = React.useState<ISubgroupStudent[]>([])
    const [loader, setLoader] = React.useState<ILoader>({
        discipline: false,
        semester: false,
        group: false,
        vidZanyatie: false,
        student: false,
        modal: false
    })
    const [valueSelects, setValueSelects] = React.useState<IValueSelects>({
        v_year: { value: null, label: '' },
        v_semester: { value: null, label: '' },
        v_group: { value: null, label: '' },
        v_vid_zanyatie: { value: null, label: '' },
        v_amount: { value: null, label: '' },
        v_type_group: { value: null, label: '' },
        v_sub_group: { value: 0, label: '' },
        v_otsenka: { value: null, label: '' },
        date: ''
    })
    const [valueWs, setValueWs] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [student, setStudent] = React.useState<IStudentList>()
    const { years } = useTypeSelector(state => state.yearReducer)
    const { ws } = useTypeSelector(state => state.wsReducer)

    const changeYear = (v: valueType) => {
        setValueSelects({
            v_year: v,
            v_sub_group: { value: null, label: '' },
            v_type_group: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_semester: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            date: '',
            v_otsenka: { value: null, label: '' },
            v_amount: { value: null, label: '' }
        })
        setValueWs({ value: null, label: '' })
        setDiscipline(undefined)
    }

    const changeWs = (v: valueType) => {
        setValueWs(v)
        const { v_year } = valueSelects
        setDiscipline(undefined)
        if (disciplines.length) {
            setDisciplines([])
        }
        getDiscipline(v.value, v_year.value)
        if (semester) {
            setSemester([])
        }
        if (groups.length) {
            setGroups([])
        }
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeDiscipline = (v: valueType) => {
        const a = disciplines.find(item => item.discipline === v.value)
        setDiscipline(a)
        setValueSelects({
            ...valueSelects,
            v_sub_group: { value: null, label: '' },
            v_type_group: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_semester: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            date: '',
            v_otsenka: { value: null, label: '' },
            v_amount: { value: null, label: '' }
        })
        if (semester) {
            setSemester([])
        }
        getSemester(a?.id_discipline, a?.isSelect, a?.Krdt)
        if (groups.length) {
            setGroups([])
        }
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeSemester = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_semester: v,
            v_sub_group: { value: null, label: '' },
            v_type_group: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            date: '',
            v_otsenka: { value: null, label: '' },
            v_amount: { value: null, label: '' }
        })
        if (groups.length) {
            setGroups([])
        }
        getGroup(v.value)
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeGroup = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_group: v,
            v_sub_group: { value: null, label: '' },
            v_type_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            date: '',
            v_otsenka: { value: null, label: '' },
            v_amount: { value: null, label: '' }
        })
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
        getVidZanyatie()
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeVidZanyatie = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_vid_zanyatie: v,
            v_sub_group: { value: null, label: '' },
            v_type_group: { value: null, label: '' },
            v_otsenka: { value: null, label: '' },
            v_amount: { value: null, label: '' }
        })
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeAmount = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_amount: v, v_type_group: { value: null, label: '' } })
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const d1: string = dayjs(new Date()).format('YYYY-MM-DD')
        const d2: string = dayjs(e.target.value).format('YYYY-MM-DD')
        if (d2 > d1) {
            return toast('Нельзя выбрать завтрашний день', 'warn')
        }
        setValueSelects({
            ...valueSelects,
            date: e.target.value,
            v_sub_group: { value: null, label: '' },
            v_type_group: { value: null, label: '' },
            v_otsenka: { value: null, label: '' }
        })
        getOtsenka(d2)
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeTypeGroup = (v: valueType) => {
        if (v.value) {
            setValueSelects({ ...valueSelects, v_type_group: v })
            return setStudentList([])
        }
        setValueSelects({
            ...valueSelects,
            v_type_group: v,
            v_sub_group: { value: null, label: '' },
            v_otsenka: { value: null, label: '' }
        })
        getStudentList()
    }

    const changeSubGroup = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_sub_group: v, v_otsenka: { value: null, label: '' } })
        getStudentList(v.value)
    }

    const getDiscipline = async (ws: null | number | string, year: null | number | string) => {
        setLoader({ ...loader, discipline: true })
        const { v_year } = valueSelects
        const { data } = await request(`/teacher/discipline?id_year=${year}&id_ws=${ws}&id_teacher=${id_user}`)
        setDisciplines(data)
        setLoader({ ...loader, discipline: false })
    }

    const getSemester = async (discipline?: number, isSelect?: number, credit?: number) => {
        setLoader({ ...loader, semester: true })
        const { v_year } = valueSelects
        const { data } = await request(
            `/teacher/semester?id_year=${v_year.value}&id_ws=${valueWs.value}&id_teacher=${id_user}&id_discipline=${discipline}&isSelect=${isSelect}&credit=${credit}`
        )
        setSemester(data)
        setLoader({ ...loader, semester: false })
    }

    const getGroup = async (semester: number | null | string) => {
        setLoader({ ...loader, group: true })
        const { v_year } = valueSelects
        const { data } = await request(
            `/teacher/group?id_year=${v_year.value}&id_ws=${valueWs.value}&id_teacher=${id_user}&id_discipline=${discipline?.id_discipline}&isSelect=${discipline?.isSelect}&credit=${discipline?.Krdt}&id_semester=${semester}`
        )
        setGroups(data)
        setLoader({ ...loader, group: false })
    }

    const getVidZanyatie = async () => {
        setLoader({ ...loader, vidZanyatie: true })
        const { data } = await request('/teacher/vid-zanyatie')
        setVidZanyatie(data)
        setLoader({ ...loader, vidZanyatie: false })
    }

    const getStudentList = async (subGroup: number | string | null = 0) => {
        setLoader({ ...loader, student: true })
        const { v_year, v_group, v_semester, v_vid_zanyatie, v_amount, date } = valueSelects
        const { data } = await request(
            `/teacher/student-list?id_year=${v_year.value}&id_teacher=${id_user}&id_discipline=${discipline?.id_discipline}&isSelect=${discipline?.isSelect}&credit=${discipline?.Krdt}&id_semester=${v_semester.value}&group=${v_group.value}&visitDate=${date}&id_vid_zaniatiy=${v_vid_zanyatie.value}&timesCount=${v_amount.value}&subgroup=${subGroup}`
        )
        setStudentList(data)
        setLoader({ ...loader, student: false })
    }

    const getOtsenka = async (date: string) => {
        // const { data } = await request(`/teacher/otsenka?role=${id_role}&date=${dayjs(new Date()).format('YYYY-MM-DD')}`)
        const { data } = await request('/teacher/get-otsenka', 'POST', {
            role: id_role,
            date
        })
        setGrade(data)
    }

    const getSubGroupStudent = async () => {
        setLoader({ ...loader, modal: true })
        const { v_year, v_group, v_semester, v_vid_zanyatie } = valueSelects
        const { data } = await request(
            `/teacher/subgroup-students?year=${v_year.value}&semester=${v_semester.value}&discipline=${discipline?.id_discipline}&credit=${discipline?.Krdt}&group=${v_group?.value}&id_teacher=${id_user}&id_vid_zaniatiy=${v_vid_zanyatie.value}`
        )
        setSubgroupStudents(data)
        setLoader({ ...loader, modal: false })
    }

    const updateOtsenkaApi = async (v: valueType) => {
        const { v_sub_group, v_type_group } = valueSelects
        const { message, type }: IRes = await request('/teacher/otsenka', 'PUT', {
            id_teacher: id_user,
            id_student: student?.id_student,
            id_discipline: student?.id_discipline,
            credit: student?.kredits,
            visitDate: student?.visitDate,
            isVisited: student?.isVisited,
            id_groupOrPorok: student?.id_groupOrPorok,
            isPotok: discipline?.isSelect,
            id_year: student?.id_a_year,
            id_semesterOrWs: student?.id_semesterOrWs,
            id_vid_zaniatiy: student?.id_vid_zaniatiy,
            timesCount: student?.timesCount,
            id_otsenka: v.value,
            typeGroup: v_type_group.value,
            subgroup: v_sub_group.value
        })
        toast(message, type)
    }

    const PostEveryoneWasPresent = async () => {
        const { v_type_group, v_sub_group } = valueSelects
        const { timesCount, id_vid_zaniatiy, id_discipline, id_semesterOrWs, id_groupOrPorok, isVisited, visitDate, id_a_year, kredits } =
            studentList[0]
        const { message, type }: IRes = await request('/teacher/otsenka', 'POST', {
            id_teacher: id_user,
            id_discipline: id_discipline,
            credit: kredits,
            visitDate: visitDate,
            isVisited: isVisited,
            id_groupOrPorok: id_groupOrPorok,
            isPotok: discipline?.isSelect,
            id_year: id_a_year,
            id_semesterOrWs: id_semesterOrWs,
            id_vid_zaniatiy: id_vid_zaniatiy,
            timesCount: timesCount,
            typeGroup: v_type_group.value,
            subgroup: v_sub_group.value
        })
        toast(message, type)
        getStudentList()
    }

    const postSubGroupStudent = async (id_student: number | null, subgroup: number | string | null, studentSubgroup: null | number) => {
        const { v_group, v_year, v_vid_zanyatie, v_semester } = valueSelects
        const { message, type }: IRes = await request('/teacher/subgroup', 'POST', {
            year: v_year.value,
            discipline: discipline?.id_discipline,
            credit: discipline?.Krdt,
            id_teacher: id_user,
            id_vid_zaniatiy: v_vid_zanyatie.value,
            id_semesterOrWs: v_semester.value,
            id_groupOrPorok: v_group.value,
            id_student,
            studentSubgroup,
            subgroup
        })
        getSubGroupStudent()
        toast(message, type)
    }
    const showModal = () => {
        document.body.style.overflowY = 'hidden'
        setIsModal(true)
        getSubGroupStudent()
    }

    const hideModal = () => {
        document.body.style.overflowY = 'visible'
        setIsModal(false)
        setSubgroupStudents([])
        const { v_sub_group } = valueSelects

        if (v_sub_group.value) {
            return getStudentList(v_sub_group.value)
        }
    }

    React.useEffect(() => {
        if (years.length) {
            // @ts-ignore
            const { id_a_year, p32 } = years.find(item => item.defaultValue == 1)
            setValueSelects({ ...valueSelects, v_year: { value: id_a_year, label: p32 } })
            if (ws.length) {
                // @ts-ignore
                const { id_ws, ws: a } = ws.find(item => item.defaultValue == 1)
                // @ts-ignore
                setValueWs({ value: id_ws, label: a })
                getDiscipline(id_ws, id_a_year)
            }
        }
    }, [years, ws])

    const { v_year, v_semester, v_group, v_vid_zanyatie, v_type_group, date, v_amount, v_sub_group } = valueSelects
    return (
        <>
            {isModal && (
                <ModalWindow title="Сформировать подгруппы" hide={hideModal}>
                    <>
                        {loader.modal && (
                            <div className="flex justify-content-center align-items-center">
                                <Loader />
                            </div>
                        )}
                        {subgroupStudents.length ? (
                            <table className="table">
                                <thead style={{ top: '0' }} className="bg-light">
                                    <tr style={{ backgroundColor: 'white', textAlign: 'center' }}>
                                        <th>№</th>
                                        <th>ФИО</th>
                                        <th style={{ width: '200px' }}>Подгруппа</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subgroupStudents.map((item, index) => (
                                        <RenderSubGroup key={item.id_student} item={item} index={index} postSubGroupStudent={postSubGroupStudent} />
                                    ))}
                                </tbody>
                            </table>
                        ) : null}
                    </>
                </ModalWindow>
            )}
            <div className="box_container">
                <div className={styles.container}>
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
                            value={valueWs.value ? valueWs : ''}
                            options={ws.map(item => ({ value: item.id_ws, label: item.ws }))}
                            onChange={changeWs}
                            isDisabled={!v_year.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Дисциплина"
                            label="Дисциплина"
                            value={
                                discipline?.discipline
                                    ? {
                                          value: discipline.discipline,
                                          label: discipline.discipline
                                      }
                                    : ''
                            }
                            options={disciplines.map(item => ({ value: item.discipline, label: item.discipline }))}
                            loader={loader.discipline}
                            onChange={changeDiscipline}
                            isDisabled={!valueWs.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Семестр"
                            label="Семестр"
                            value={v_semester.value ? v_semester : ''}
                            options={semester.map(item => ({ value: item.id_semester, label: item.semester }))}
                            loader={loader.semester}
                            onChange={changeSemester}
                            isDisabled={!discipline?.discipline}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Группа"
                            label="Группа"
                            value={v_group.value ? v_group : ''}
                            options={groups.map(item => ({ value: item.id_group, label: item.groups }))}
                            loader={loader.group}
                            onChange={changeGroup}
                            isDisabled={!v_semester.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Вид занятие"
                            label="Вид занятие"
                            value={v_vid_zanyatie.value ? v_vid_zanyatie : ''}
                            options={vidZanyatie.map(item => ({
                                value: item.id_vid_zaniatiy,
                                label: item.name_vid_zaniatiy
                            }))}
                            loader={loader.vidZanyatie}
                            onChange={changeVidZanyatie}
                            isDisabled={!v_group.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Количество раз"
                            label="Количество раз"
                            value={v_amount.value ? v_amount : ''}
                            options={amount}
                            onChange={changeAmount}
                            isDisabled={!v_vid_zanyatie.value}
                        />
                    </div>
                    <div className="w-100">
                        <Input
                            label="Дата посещения"
                            value={date}
                            onChange={changeDate}
                            type="date"
                            min="00-00-0000"
                            max="2099-01-01"
                            readOnly={!v_amount.value}
                        />
                    </div>
                    {discipline?.isSelect === 0 ? (
                        <>
                            <div className="w-100">
                                <SelectCustom
                                    placeholder="Тип группы"
                                    label="Тип группы"
                                    value={v_type_group.value || v_type_group.value == 0 ? v_type_group : ''}
                                    options={typeGroup}
                                    loader={loader.group}
                                    onChange={changeTypeGroup}
                                    isDisabled={!date.length}
                                />
                            </div>
                            {v_type_group.value == 1 && (
                                <div className="w-100">
                                    <SelectCustom
                                        value={v_sub_group.value ? v_sub_group : ''}
                                        placeholder="Подгруппа"
                                        label="Подгруппа"
                                        options={subGroup}
                                        loader={loader.group}
                                        onChange={changeSubGroup}
                                        isDisabled={!v_type_group.value}
                                    />
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {v_type_group.value == 1 && <Button onClick={showModal} value="Сформировать" disabled={!(v_type_group.value == 1)} />}
                    <Button onClick={PostEveryoneWasPresent} value="Все присутствовали" disabled={!studentList.length} />
                    <Button
                        value="Отчет журнала"
                        disabled={!studentList.length}
                        onClick={toReport.bind(null, discipline as IDiscipline, {
                            v_year: v_year.value,
                            v_group: v_group.value,
                            v_vid_zanyatie: v_vid_zanyatie.value,
                            v_ws: valueWs.value
                        })}
                    />
                </div>
            </div>
            {loader.student ? (
                <div className="flex justify-content-center mt-2">
                    <Loader />
                </div>
            ) : studentList.length ? (
                <div className="overflow-auto mt-4 box_container" style={{ maxHeight: '900px', minHeight: '400px' }}>
                    <table className="table">
                        <thead className="bg-light">
                            <tr>
                                <th className="th">№</th>
                                <th className="th">ФИО</th>
                                <th className="th">Оценка</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((item, index) => (
                                <StudentsList
                                    key={item.id_student}
                                    index={index}
                                    item={item}
                                    setStudent={setStudent}
                                    grade={grade}
                                    updateOtsenkaApi={updateOtsenkaApi}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center mt-4">Пока нет данных!</p>
            )}
        </>
    )
}

export default Teacher
