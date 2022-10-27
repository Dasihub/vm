import React from 'react'
import dayjs from 'dayjs'
import { Loader } from '../../components'
import { valueType } from '../../components/SelectCustom/ISelect'
import { IDirection, IFaculties, IFeduc, IGroups, ILoader, ISemester, ISpecialities, IStudents, IValueSelects, IVidZanyatie } from './IMain'
import { useHttp } from '../../hooks/useHttp'
import { ModalJurnal, SelectsMain, Students } from '../../ui'
import { fetchJurnal } from '../../redux/action/jurnalAction'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { useTypeSelector } from '../../hooks/useTypeSelector'

const MainPage: React.FC = () => {
    const { request } = useHttp()
    const dispatch = useTypeDispatch()
    const [isModal, setIsModal] = React.useState<boolean>(false)
    const { years } = useTypeSelector(state => state.yearReducer)
    const { id_avn_user } = useTypeSelector(state => state.authReducer)
    const [semester, setSemester] = React.useState<ISemester[]>([])
    const [faculties, setFaculties] = React.useState<IFaculties[]>([])
    const [feduc, setFeduc] = React.useState<IFeduc[]>([])
    const [direction, setDirection] = React.useState<IDirection[]>([])
    const [specialities, setSpecialities] = React.useState<ISpecialities[]>([])
    const [groups, setGroups] = React.useState<IGroups[]>([])
    const [vidZanyatie, setVidZanyatie] = React.useState<IVidZanyatie[]>([])
    const [students, setStudents] = React.useState<IStudents[]>([])
    const [isLoader, setIsLoader] = React.useState<ILoader>({
        feduc: false,
        group: false,
        direction: false,
        faculty: false,
        semester: false,
        speciality: false,
        vid_zanyatie: false,
        student: false
    })
    const [valueSelects, setValueSelects] = React.useState<IValueSelects>({
        v_year: { value: null, label: '' },
        v_ws: { value: null, label: '' },
        v_semester: { value: null, label: '' },
        v_faculty: { value: null, label: '' },
        v_feduc: { value: null, label: '' },
        v_direction: { value: null, label: '' },
        v_speciality: { value: null, label: '' },
        v_group: { value: null, label: '' },
        v_vid_zanyatie: { value: null, label: '' },
        v_date: dayjs(new Date()).format('YYYY-MM-DD')
    })

    const changeYear = (v: valueType) => {
        setValueSelects({
            v_year: v,
            v_ws: { value: null, label: '' },
            v_semester: { value: null, label: '' },
            v_faculty: { value: null, label: '' },
            v_feduc: { value: null, label: '' },
            v_direction: { value: null, label: '' },
            v_speciality: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            v_date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        if (students.length) {
            setStudents([])
        }
        if (semester.length) {
            setSemester([])
        }
        if (faculties.length) {
            setFaculties([])
        }
        if (feduc.length) {
            setFeduc([])
        }
        if (direction.length) {
            setDirection([])
        }
        if (specialities.length) {
            setSpecialities([])
        }
        if (groups.length) {
            setGroups([])
        }
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
    }

    const changeWs = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_ws: v,
            v_semester: { value: null, label: '' },
            v_faculty: { value: null, label: '' },
            v_feduc: { value: null, label: '' },
            v_direction: { value: null, label: '' },
            v_speciality: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            v_date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        if (semester.length) {
            setSemester([])
        }
        if (students.length) {
            setStudents([])
        }
        getSemester(v.value)
        if (faculties.length) {
            setFaculties([])
        }
        if (feduc.length) {
            setFeduc([])
        }
        if (direction.length) {
            setDirection([])
        }
        if (specialities.length) {
            setSpecialities([])
        }
        if (groups.length) {
            setGroups([])
        }
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
    }

    const changeSemester = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_semester: v,
            v_faculty: { value: null, label: '' },
            v_feduc: { value: null, label: '' },
            v_direction: { value: null, label: '' },
            v_speciality: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            v_date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        if (faculties.length) {
            setFaculties([])
        }
        if (students.length) {
            setStudents([])
        }
        getFaculties()
        if (feduc.length) {
            setFeduc([])
        }
        if (direction.length) {
            setDirection([])
        }
        if (specialities.length) {
            setSpecialities([])
        }
        if (groups.length) {
            setGroups([])
        }
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
    }

    const changeFaculties = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_faculty: v,
            v_feduc: { value: null, label: '' },
            v_direction: { value: null, label: '' },
            v_speciality: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            v_date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        if (feduc.length) {
            setFeduc([])
        }
        if (students.length) {
            setStudents([])
        }
        getFeduc(v.value)
        if (direction.length) {
            setDirection([])
        }
        if (specialities.length) {
            setSpecialities([])
        }
        if (groups.length) {
            setGroups([])
        }
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
    }

    const changeFeduc = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_feduc: v,
            v_direction: { value: null, label: '' },
            v_speciality: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            v_date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        if (direction.length) {
            setDirection([])
        }
        if (students.length) {
            setStudents([])
        }
        getDirection(v.value)
        if (specialities.length) {
            setSpecialities([])
        }
        if (groups.length) {
            setGroups([])
        }
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
    }

    const changeDirection = async (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_direction: v,
            v_speciality: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            v_date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        if (specialities.length) {
            setSpecialities([])
        }
        if (students.length) {
            setStudents([])
        }
        getSpecialities(v.value)
        if (groups.length) {
            setGroups([])
        }
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
    }

    const changeSpeciality = async (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_speciality: v,
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            v_date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        if (groups.length) {
            setGroups([])
        }
        if (students.length) {
            setStudents([])
        }
        getGroup(v.value)
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
    }

    const changeGroup = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_group: v })
        if (vidZanyatie.length) {
            setVidZanyatie([])
        }
        if (students.length) {
            setStudents([])
        }
        getVidZanyatie(v.value)
    }

    const changeVidZanyatie = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_vid_zanyatie: v })
        getStudents(v.value)
    }

    const getSemester = async (ws: number | null | string) => {
        setIsLoader({ ...isLoader, semester: true })
        const { data } = await request(`/selectors/semester/${ws}`)
        setIsLoader({ ...isLoader, semester: false })
        setSemester(data)
    }

    const getFaculties = async () => {
        setIsLoader({ ...isLoader, faculty: true })
        const { data } = await request(`/selectors/faculties/${id_avn_user}`)
        setIsLoader({ ...isLoader, faculty: false })
        setFaculties(data)
    }

    const getFeduc = async (id_faculty: number | null | string) => {
        setIsLoader({ ...isLoader, feduc: true })
        const { data } = await request(`/selectors/feduc?id_user=${id_avn_user}&id_faculty=${id_faculty}`)
        setIsLoader({ ...isLoader, feduc: false })
        setFeduc(data)
    }

    const getDirection = async (id_f_educ: number | null | string) => {
        const { v_year, v_semester, v_faculty } = valueSelects
        setIsLoader({ ...isLoader, direction: true })
        const { data } = await request(
            `/selectors/direction?id_year=${v_year.value}&id_semester=${v_semester.value}&id_faculty=${v_faculty.value}&id_f_educ=${id_f_educ}`
        )
        setIsLoader({ ...isLoader, direction: false })
        setDirection(data)
    }

    const getSpecialities = async (id_direction: number | null | string) => {
        const { v_year, v_semester, v_faculty, v_feduc } = valueSelects
        setIsLoader({ ...isLoader, speciality: true })
        const { data } = await request(
            `/selectors/specialities?id_year=${v_year.value}&id_semester=${v_semester.value}&id_faculty=${v_faculty.value}&id_f_educ=${v_feduc.value}&id_direction=${id_direction}`
        )
        setIsLoader({ ...isLoader, speciality: false })
        setSpecialities(data)
    }

    const getGroup = async (id_speciality: number | null | string) => {
        const { v_year, v_faculty, v_semester } = valueSelects
        setIsLoader({ ...isLoader, group: true })
        const { data } = await request(
            `/selectors/group?id_year=${v_year.value}&id_semester=${v_semester.value}&id_faculty=${v_faculty.value}&id_speciality=${id_speciality}`
        )
        setIsLoader({ ...isLoader, group: false })
        setGroups(data)
    }

    const getVidZanyatie = async (id_group: number | null | string) => {
        const { v_year, v_semester } = valueSelects
        setIsLoader({ ...isLoader, vid_zanyatie: true })
        const { data } = await request(`/selectors/vid-zanyatie?id_year=${v_year.value}&id_semester=${v_semester.value}&id_group=${id_group}`)
        setIsLoader({ ...isLoader, vid_zanyatie: false })
        setVidZanyatie(data)
    }

    const getStudents = async (id_vid_zaniatiy: number | null | string) => {
        setIsLoader({ ...isLoader, student: true })
        const { v_year, v_ws, v_semester, v_faculty, v_feduc, v_group } = valueSelects
        const { data } = await request(
            `/dekanat/students/?id_year=${v_year.value}&id_ws=${v_ws.value}&id_semester=${v_semester.value}&id_faculty=${v_faculty.value}&id_f_educ=${v_feduc.value}&id_group=${v_group.value}&id_vid_zaniatiy=${id_vid_zaniatiy}`
        )
        setIsLoader({ ...isLoader, student: false })
        setStudents(data)
    }

    const showModal = () => {
        document.body.style.overflowY = 'hidden'
        setIsModal(true)
    }

    const hideModal = () => {
        document.body.style.overflowY = 'visible'
        setIsModal(false)
    }

    React.useEffect(() => {
        // getYears()
        // getWs()
        dispatch(fetchJurnal())
    }, [])

    React.useEffect(() => {
        if (years.length) {
            // @ts-ignore
            const { id_a_year, p32 } = years.find(item => item.defaultValue == 1)
            setValueSelects({ ...valueSelects, v_year: { value: id_a_year, label: p32 } })
        }
    }, [years])

    return (
        <>
            <SelectsMain
                valueSelects={valueSelects}
                specialities={specialities}
                vidZanyatie={vidZanyatie}
                faculties={faculties}
                direction={direction}
                semester={semester}
                groups={groups}
                feduc={feduc}
                changeYear={changeYear}
                changeWs={changeWs}
                changeSemester={changeSemester}
                changeFaculties={changeFaculties}
                changeFeduc={changeFeduc}
                changeDirection={changeDirection}
                changeSpeciality={changeSpeciality}
                changeGroup={changeGroup}
                changeVidZanyatie={changeVidZanyatie}
                isLoader={isLoader}
            />
            {isLoader.student ? (
                <div className="flex justify-content-center align-items-center mt-2">
                    <Loader />
                </div>
            ) : students.length ? (
                <Students showModal={showModal} students={students} />
            ) : (
                <p className="text-center mt-4">Выберите поля чтобы вывести данные!</p>
            )}
            {isModal && <ModalJurnal hideModal={hideModal} />}
        </>
    )
}

export default MainPage
