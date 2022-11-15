import React from 'react'
import { useHttp } from '../../../hooks/useHttp'
import { useTypeDispatch } from '../../../hooks/useTypeDispatch'
import { useTypeSelector } from '../../../hooks/useTypeSelector'
import {
    IDekanatProps,
    IDirection,
    IFaculties,
    IFeduc,
    IGroups,
    ILoader,
    ISemester,
    ISpecialities,
    IStudents,
    IValueSelects,
    IVidZanyatie
} from './IDekanat'
import dayjs from 'dayjs'
import { valueType } from '../../../components/SelectCustom/ISelect'
import { fetchJurnal } from '../../../redux/action/jurnalAction'
import styles from './styles.module.scss'
import { Loader, SelectCustom } from '../../../components'
import { Students } from '../../index'

const Dekanat: React.FC<IDekanatProps> = ({ showModal }) => {
    const { request } = useHttp()
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { ws, isLoaderWs } = useTypeSelector(state => state.wsReducer)
    const dispatch = useTypeDispatch()
    const { id_avn_user } = useTypeSelector(state => state.authReducer)
    const [semester, setSemester] = React.useState<ISemester[]>([])
    const [faculties, setFaculties] = React.useState<IFaculties[]>([])
    const [feduc, setFeduc] = React.useState<IFeduc[]>([])
    const [direction, setDirection] = React.useState<IDirection[]>([])
    const [specialities, setSpecialities] = React.useState<ISpecialities[]>([])
    const [groups, setGroups] = React.useState<IGroups[]>([])
    const [vidZanyatie, setVidZanyatie] = React.useState<IVidZanyatie[]>([])
    const [valueWs, setValueWs] = React.useState<valueType>({
        value: null,
        label: ''
    })
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
            v_semester: { value: null, label: '' },
            v_faculty: { value: null, label: '' },
            v_feduc: { value: null, label: '' },
            v_direction: { value: null, label: '' },
            v_speciality: { value: null, label: '' },
            v_group: { value: null, label: '' },
            v_vid_zanyatie: { value: null, label: '' },
            v_date: dayjs(new Date()).format('YYYY-MM-DD')
        })
        setValueWs({ value: null, label: '' })
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
        setValueWs(v)
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
        const { v_year, v_semester, v_faculty, v_feduc, v_group } = valueSelects
        const { data } = await request(
            `/dekanat/students/?id_year=${v_year.value}&id_ws=${valueWs.value}&id_semester=${v_semester.value}&id_faculty=${v_faculty.value}&id_f_educ=${v_feduc.value}&id_group=${v_group.value}&id_vid_zaniatiy=${id_vid_zaniatiy}`
        )
        setIsLoader({ ...isLoader, student: false })
        setStudents(data)
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

    React.useEffect(() => {
        if (ws.length) {
            // @ts-ignore
            const { id_ws, ws: a } = ws.find(item => item.defaultValue == 1)
            setValueWs({ value: id_ws, label: a })
            getSemester(id_ws)
        }
    }, [ws])
    return (
        <>
            <div className="box_container">
                <div className={styles.container}>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Учебный год"
                            label="Учебный год"
                            value={valueSelects.v_year}
                            options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                            onChange={changeYear}
                            loader={isLoaderYear}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Полугодие"
                            label="Полугодие"
                            value={valueWs ? valueWs : ''}
                            options={
                                valueSelects.v_year.value
                                    ? ws.map(item => ({
                                          value: item.id_ws,
                                          label: item.ws
                                      }))
                                    : []
                            }
                            onChange={changeWs}
                            loader={isLoaderWs}
                            isDisabled={!valueSelects.v_year.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Семестр"
                            label="Семестр"
                            value={valueSelects.v_semester.value ? valueSelects.v_semester : ''}
                            options={
                                valueWs.value
                                    ? semester.map(item => ({
                                          value: item.id_semester,
                                          label: item.semester
                                      }))
                                    : []
                            }
                            onChange={changeSemester}
                            loader={isLoader.semester}
                            isDisabled={!valueWs.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Факультет"
                            label="Факультет"
                            value={valueSelects.v_faculty.value ? valueSelects.v_faculty : ''}
                            options={
                                valueSelects.v_semester.value
                                    ? faculties.map(item => ({
                                          value: item.id_faculty,
                                          label: item.faculty
                                      }))
                                    : []
                            }
                            onChange={changeFaculties}
                            loader={isLoader.faculty}
                            isDisabled={!valueSelects.v_semester.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Форма обучение"
                            label="Форма обучение"
                            value={valueSelects.v_feduc.value ? valueSelects.v_feduc : ''}
                            options={
                                valueSelects.v_faculty.value
                                    ? feduc.map(item => ({
                                          value: item.id_f_educ,
                                          label: item.f_educ
                                      }))
                                    : []
                            }
                            onChange={changeFeduc}
                            loader={isLoader.feduc}
                            isDisabled={!valueSelects.v_faculty.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Направление"
                            label="Направление"
                            value={valueSelects.v_direction.value ? valueSelects.v_direction : ''}
                            options={
                                valueSelects.v_feduc.value
                                    ? direction.map(item => ({
                                          value: item.id_direction,
                                          label: item.direction
                                      }))
                                    : []
                            }
                            onChange={changeDirection}
                            loader={isLoader.direction}
                            isDisabled={!valueSelects.v_feduc.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Специальность"
                            label="Специальность"
                            value={valueSelects.v_speciality.value ? valueSelects.v_speciality : ''}
                            options={
                                valueSelects.v_direction.value
                                    ? specialities.map(item => ({
                                          value: item.id_speciality,
                                          label: item.special
                                      }))
                                    : []
                            }
                            onChange={changeSpeciality}
                            loader={isLoader.speciality}
                            isDisabled={!valueSelects.v_direction.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Группа"
                            label="Группа"
                            value={valueSelects.v_group.value ? valueSelects.v_group : ''}
                            options={
                                valueSelects.v_speciality.value
                                    ? groups.map(item => ({
                                          value: item.id_group,
                                          label: item.p20
                                      }))
                                    : []
                            }
                            onChange={changeGroup}
                            loader={isLoader.group}
                            isDisabled={!valueSelects.v_speciality.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Вид занятие"
                            label="Вид занятие"
                            value={valueSelects.v_vid_zanyatie.value ? valueSelects.v_vid_zanyatie : ''}
                            options={
                                valueSelects.v_group.value
                                    ? vidZanyatie.map(item => ({
                                          value: item.id_vid_zaniatiy,
                                          label: item.vid_zaniatiy
                                      }))
                                    : []
                            }
                            onChange={changeVidZanyatie}
                            loader={isLoader.vid_zanyatie}
                            isDisabled={!valueSelects.v_group.value}
                        />
                    </div>
                </div>
            </div>
            {isLoader.student ? (
                <div className="flex justify-content-center align-items-center mt-2">
                    <Loader />
                </div>
            ) : students.length ? (
                <Students showModal={showModal} students={students} />
            ) : (
                <p className="text-center mt-4">Выберите поля чтобы вывести данные!</p>
            )}
        </>
    )
}

export default Dekanat
