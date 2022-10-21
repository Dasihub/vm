import React from 'react'
import { Loader } from '../../components'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { valueType } from '../../components/SelectCustom/ISelect'
import { IDiscipline, IGroups, ILoader, IGrade, ISemester, IStudentList, ISubgroupStudent, IValueSelects, IVidZanyatie } from './ITeacher'
import { useHttp } from '../../hooks/useHttp'
import { useMessage } from '../../hooks/useMessage'
import { IRes } from '../../models/IModels'
import { SelectsTeacher, StudentsList } from '../../ui'
import { JournalReport } from '../../reportPages'
import dayjs from 'dayjs'

const TeacherPage: React.FC = () => {
    const { request } = useHttp()
    const toast = useMessage()
    const { id_user } = useTypeSelector(state => state.authReducer)
    const [disciplines, setDisciplines] = React.useState<IDiscipline[]>([])
    const [discipline, setDiscipline] = React.useState<IDiscipline>()
    const [semester, setSemester] = React.useState<ISemester[]>([])
    const [groups, setGroups] = React.useState<IGroups[]>([])
    const [vidZanyatie, setVidZanyatie] = React.useState<IVidZanyatie[]>([])
    const [studentList, setStudentList] = React.useState<IStudentList[]>([])
    const [grade, setGrade] = React.useState<IGrade[]>([])
    const [isModal, setIsModal] = React.useState<boolean>(false)
    const [isReport, setIsReport] = React.useState<boolean>(false)
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
        v_ws: { value: null, label: '' },
        v_semester: { value: null, label: '' },
        v_group: { value: null, label: '' },
        v_vid_zanyatie: { value: null, label: '' },
        v_amount: { value: null, label: '' },
        v_type_group: { value: null, label: '' },
        v_sub_group: { value: 0, label: '' },
        v_otsenka: { value: null, label: '' },
        date: ''
    })
    const [student, setStudent] = React.useState<IStudentList>()
    const { years } = useTypeSelector(state => state.yearReducer)
    const { ws } = useTypeSelector(state => state.wsReducer)

    const changeYear = (v: valueType) => setValueSelects({ ...valueSelects, v_year: v })

    const changeWs = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_ws: v })
        getDiscipline(v.value)
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeDiscipline = (v: valueType) => {
        const a = disciplines.find(item => item.discipline === v.value)
        setDiscipline(a)
        getSemester(a?.id_discipline, a?.isSelect, a?.Krdt)
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeSemester = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_semester: v })
        getGroup(v.value)
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeGroup = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_group: v })
        getVidZanyatie()
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeVidZanyatie = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_vid_zanyatie: v })
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeAmount = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_amount: v })
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
        setValueSelects({ ...valueSelects, date: e.target.value })
        getOtsenka()
        if (studentList.length) {
            setStudentList([])
        }
    }

    const changeTypeGroup = (v: valueType) => {
        if (v.value) {
            setValueSelects({ ...valueSelects, v_type_group: v })
            return setStudentList([])
        }
        setValueSelects({ ...valueSelects, v_type_group: v, v_sub_group: { value: null, label: '' } })
        getStudentList()
    }

    const changeSubGroup = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_sub_group: v })
        getStudentList(v.value)
    }

    const getDiscipline = async (ws: null | number | string) => {
        setLoader({ ...loader, discipline: true })
        const { v_year } = valueSelects
        const { data } = await request(`/teacher/discipline?id_year=${v_year.value}&id_ws=${ws}&id_teacher=${id_user}`)
        setDisciplines(data)
        setLoader({ ...loader, discipline: false })
    }

    const getSemester = async (discipline?: number, isSelect?: number, credit?: number) => {
        setLoader({ ...loader, semester: true })
        const { v_year, v_ws } = valueSelects
        const { data } = await request(
            `/teacher/semester?id_year=${v_year.value}&id_ws=${v_ws.value}&id_teacher=${id_user}&id_discipline=${discipline}&isSelect=${isSelect}&credit=${credit}`
        )
        setSemester(data)
        setLoader({ ...loader, semester: false })
    }

    const getGroup = async (semester: number | null | string) => {
        setLoader({ ...loader, group: true })
        const { v_year, v_ws } = valueSelects
        const { data } = await request(
            `/teacher/group?id_year=${v_year.value}&id_ws=${v_ws.value}&id_teacher=${id_user}&id_discipline=${discipline?.id_discipline}&isSelect=${discipline?.isSelect}&credit=${discipline?.Krdt}&id_semester=${semester}`
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

    const getOtsenka = async () => {
        const { data } = await request('/teacher/otsenka')
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
        const { timesCount, id_vid_zaniatiy, id_discipline, id_semesterOrWs, id_groupOrPorok, id_group, isVisited, visitDate, id_a_year, kredits } =
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
        }
    }, [years])

    const back = () => {
        const { v_sub_group } = valueSelects
        setIsReport(false)
        getStudentList(v_sub_group.value)
    }

    if (isReport) {
        return (
            <JournalReport
                groups={groups}
                vidZanyatie={vidZanyatie}
                credit={discipline?.Krdt}
                isSelect={discipline?.isSelect}
                discipline={discipline?.discipline}
                idDiscipline={discipline?.id_discipline}
                idYear={valueSelects.v_year.value}
                idGroup={valueSelects.v_group.value}
                idVidZanyatie={valueSelects.v_vid_zanyatie.value}
                idWs={valueSelects.v_ws.value}
                back={back}
            />
        )
    }

    return (
        <>
            <SelectsTeacher
                ws={ws}
                years={years}
                groups={groups}
                loader={loader}
                isModal={isModal}
                semester={semester}
                discipline={discipline}
                disciplines={disciplines}
                vidZanyatie={vidZanyatie}
                studentList={studentList}
                valueSelects={valueSelects}
                subgroupStudents={subgroupStudents}
                changeWs={changeWs}
                hideModal={hideModal}
                showModal={showModal}
                setStudent={setStudent}
                changeYear={changeYear}
                changeDate={changeDate}
                changeGroup={changeGroup}
                setIsReport={setIsReport}
                changeAmount={changeAmount}
                changeSemester={changeSemester}
                changeSubGroup={changeSubGroup}
                changeTypeGroup={changeTypeGroup}
                changeDiscipline={changeDiscipline}
                changeVidZanyatie={changeVidZanyatie}
                postSubGroupStudent={postSubGroupStudent}
                PostEveryoneWasPresent={PostEveryoneWasPresent}
            />
            {loader.student ? (
                <div className="flex justify-content-center mt-2">
                    <Loader />
                </div>
            ) : studentList.length ? (
                <div className="overflow-auto mt-4" style={{ maxHeight: '900px', minHeight: '400px' }}>
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
            ) : null}
        </>
    )
}

export default TeacherPage
