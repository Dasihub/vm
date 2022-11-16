import React from 'react'
import styles from './style.module.scss'
import { ModalWindow, SelectCustom } from '../../components'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { useHttp } from '../../hooks/useHttp'
import { IDiscipline, IJournal, ILoader, ISemester, ITeacher, IValueSelect } from '../StudentPage/IStudent'
import { valueType } from '../../components/SelectCustom/ISelect'
import { useGroupBy } from '../../hooks/useGroupBy'

const MobileStudentPage: React.FC = () => {
    const { request } = useHttp()
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { ws, isLoaderWs } = useTypeSelector(state => state.wsReducer)
    const [isModal, setIsModal] = React.useState(false)

    const showModal = () => {
        setIsModal(true)
    }
    const { id_group } = useTypeSelector(state => state.userInfoReducer)
    const { id_user } = useTypeSelector(state => state.authReducer)
    const [disciplines, setDisciplines] = React.useState<IDiscipline[]>([])
    const [discipline, setDiscipline] = React.useState<IDiscipline>()
    const { lang } = useTypeSelector(state => state.langReducer)
    const [semester, setSemester] = React.useState<ISemester[]>([])
    const [teachers, setTeachers] = React.useState<ITeacher[]>([])
    const [journal, setJournal] = React.useState<IJournal[]>([])
    const [data, setData] = React.useState<any>()
    const [dataMax, setDataMax] = React.useState<any>()
    const [loader, setLoader] = React.useState<ILoader>({
        discipline: false,
        semester: false,
        teacher: false,
        journal: false
    })
    const [valueSelects, setValueSelects] = React.useState<IValueSelect>({
        v_year: { value: null, label: '' },
        v_semester: { value: null, label: '' },
        v_teacher: { value: null, label: '' }
    })
    const [valueWs, setValueWs] = React.useState<valueType>({
        value: null,
        label: ''
    })

    const visitDateGrouped = useGroupBy(journal, 'short_name')

    const changeYear = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_year: v,
            v_semester: { value: null, label: '' },
            v_teacher: { value: null, label: '' }
        })
        setValueWs({ value: null, label: '' })
        setDiscipline(undefined)
        if (journal.length) {
            setJournal([])
        }
    }

    const changeWs = (v: valueType) => {
        setValueSelects({
            ...valueSelects,
            v_semester: { value: null, label: '' },
            v_teacher: { value: null, label: '' }
        })
        setValueWs(v)
        setDiscipline(undefined)
        if (disciplines.length) {
            setDisciplines([])
        }
        getDiscipline(v.value, valueSelects.v_year.value)
        if (semester.length) {
            setSemester([])
        }
        if (teachers.length) {
            setTeachers([])
        }
        if (journal.length) {
            setJournal([])
        }
    }

    const changeDiscipline = (v: valueType) => {
        // const [id_discipline, credits, isSelect] = String(v.value).split('_')
        const a = disciplines.find(item => item.num == v.value)
        setDiscipline(a)
        if (semester.length) {
            setSemester([])
        }
        getSemester(a?.id_discipline)
        if (teachers.length) {
            setTeachers([])
        }
        if (journal.length) {
            setJournal([])
        }
    }

    const changeSemester = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_semester: v, v_teacher: { value: null, label: '' } })
        if (teachers.length) {
            setTeachers([])
        }
        getTeacher(v.value)
        if (journal.length) {
            setJournal([])
        }
    }

    const changeTeacher = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_teacher: v })
        getJournal(v.value)
    }

    const getDiscipline = async (ws: null | number | string, year: null | number | string) => {
        setLoader({ ...loader, discipline: true })
        const { data }: { data: IDiscipline[] } = await request(
            `/student/discipline/?id_year=${year}&id_ws=${ws}&id_group=${id_group}&id_student=${id_user}&lang=${lang}`
        )
        const a = data.map((item, index) => {
            return { ...item, num: index }
        })
        setDisciplines(a)
        setLoader({ ...loader, discipline: false })
    }

    const getSemester = async (id_discipline: number | string | undefined) => {
        setLoader({ ...loader, semester: true })
        const { data } = await request(
            `/student/semester/?id_year=${v_year.value}&id_ws=${valueWs.value}&id_group=${id_group}&id_student=${id_user}&id_discipline=${id_discipline}&lang=${lang}`
        )
        setSemester(data)
        setLoader({ ...loader, semester: false })
    }

    const getTeacher = async (id_semester: null | number | string) => {
        setLoader({ ...loader, teacher: true })
        const { data } = await request(
            `/student/teacher/?id_year=${v_year.value}&id_ws=${valueWs.value}&id_group=${id_group}&id_student=${id_user}&id_discipline=${discipline?.id_discipline}&id_semester=${id_semester}&is_select=${discipline?.isSelect}&lang=${lang}`
        )
        setTeachers(data)
        setLoader({ ...loader, teacher: false })
    }

    const getJournal = async (id_teacher: null | number | string) => {
        setLoader({ ...loader, journal: true })
        const { data } = await request(
            `/student/journal/?id_year=${v_year.value}&id_ws=${valueWs.value}&id_group=${id_group}&id_student=${id_user}&id_discipline=${discipline?.id_discipline}&id_semester=${v_semester.value}&is_select=${discipline?.isSelect}&credit=${discipline?.credits}&id_teacher=${id_teacher}&lang=${lang}`
        )
        setJournal(data)
        setLoader({ ...loader, journal: false })

        const shotNameGroupedNew = useGroupBy(data, 'visitDate')

        // const obj
        Object.keys(shotNameGroupedNew).forEach((keyVid, indexVid) => {
            const groupedDate = useGroupBy(shotNameGroupedNew[keyVid], 'short_name')
            shotNameGroupedNew[keyVid] = groupedDate
            Object.keys(groupedDate).forEach((keyDate, indexDate) => {
                const groupedTimes = useGroupBy(shotNameGroupedNew[keyVid][keyDate], 'timesCount')
                shotNameGroupedNew[keyVid][keyDate] = groupedTimes
            })
        })

        // max occured item for vid
        let max: any = {}
        Object.keys(shotNameGroupedNew).forEach(name => {
            max[name] = 0
        })

        data.forEach((item: any) => {
            if (item.timesCount > max[item.visitDate]) {
                max[item.visitDate] = item.timesCount
            }
        })

        setData(shotNameGroupedNew)
        setDataMax(max)
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
    const { v_year, v_semester, v_teacher } = valueSelects

    return (
        <>
            {isModal && (
                <ModalWindow title="Выберите параметры" hide={setIsModal.bind(null, false)}>
                    <>
                        <div className="mt-2">
                            <SelectCustom
                                placeholder="Учебный год"
                                label="Учебный год"
                                value={v_year}
                                options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                                onChange={changeYear}
                            />
                        </div>
                        <div className="mt-2">
                            <SelectCustom
                                placeholder="Полугодие"
                                label="Полугодие"
                                value={valueWs.value ? valueWs : ''}
                                options={ws.map(item => ({ value: item.id_ws, label: item.ws }))}
                                onChange={changeWs}
                                isDisabled={!v_year.value}
                            />
                        </div>
                        <div className="mt-2">
                            <SelectCustom
                                placeholder="Дисциплина"
                                label="Дисциплина"
                                value={
                                    discipline?.id_discipline
                                        ? {
                                              value: discipline?.num,
                                              label: discipline?.discipline
                                          }
                                        : ''
                                }
                                options={disciplines.map(item => ({ value: item.num, label: item.discipline }))}
                                loader={loader.discipline}
                                onChange={changeDiscipline}
                                isDisabled={!valueWs.value}
                            />
                        </div>
                        <div className="mt-2">
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
                        <div className="mt-2">
                            <SelectCustom
                                placeholder="Преподаватель"
                                label="Преподаватель"
                                value={v_teacher.value ? v_teacher : ''}
                                options={teachers.map(item => ({ value: item.id_teacher, label: item.t_fio }))}
                                loader={loader.teacher}
                                onChange={changeTeacher}
                                isDisabled={!v_semester.value}
                            />
                        </div>
                    </>
                </ModalWindow>
            )}
            <div className={styles.choose} onClick={showModal}>
                Выберите параметры <i className="fa-solid fa-sliders" />
            </div>

            <div className="mt-2 flex justify-content-center">
                <div>
                    <div className={styles.card}>
                        <p className="color-dark">19-10-2022</p>
                        <div className={styles.container_vid_zanaytie}>
                            <div style={{ color: '#64748B', fontWeight: 'bold' }}>Лк</div>
                            <div className={styles.data_present}>
                                <div className="color-primary">присут</div>
                                <div className="color-primary">присут</div>
                                <div className="color-danger">отсутст</div>
                                <div className="color-primary">присут</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <p className="color-dark">19-10-2022</p>
                        <div className={styles.container_vid_zanaytie}>
                            <div style={{ color: '#64748B', fontWeight: 'bold' }}>Лк</div>
                            <div className={styles.data_present}>
                                <div className="color-primary">присут</div>
                                <div className="color-primary">присут</div>
                                <div className="color-danger">отсутст</div>
                                <div className="color-primary">присут</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <p className="color-dark">19-10-2022</p>
                        <div className={styles.container_vid_zanaytie}>
                            <div style={{ color: '#64748B', fontWeight: 'bold' }}>Лк</div>
                            <div className={styles.data_present}>
                                <div className="color-primary">присут</div>
                                <div className="color-primary">присут</div>
                                <div className="color-danger">отсутст</div>
                                <div className="color-primary">присут</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <p className="color-dark">19-10-2022</p>
                        <div className={styles.container_vid_zanaytie}>
                            <div style={{ color: '#64748B', fontWeight: 'bold' }}>Лк</div>
                            <div className={styles.data_present}>
                                <div className="color-primary">присут</div>
                                <div className="color-primary">присут</div>
                                <div className="color-danger">отсутст</div>
                                <div className="color-primary">присут</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileStudentPage
