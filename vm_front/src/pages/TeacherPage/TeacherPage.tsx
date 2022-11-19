import React, { ReactElement } from 'react'
import { Tabs } from '../../components'
import { SearchStudentTeacher, Teacher } from '../../ui'
import { JournalReport } from '../../reportPages'
import styles from '../MainPage/styles.module.scss'
import { teacherDataTab } from '../../config/data'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { authSlice } from '../../redux/reducers/AuthSlice'
import { useDispatch } from 'react-redux'
import { IDiscipline, IGroups, IVidZanyatie } from '../../ui/Teacher/Teacher/ITeacher'
import { IDataForJournal } from './ITeacher'
import { id_role_teacher } from '../../config/roles'

const TeacherPage: React.FC = () => {
    const dispatch = useDispatch()
    const { id_role } = useTypeSelector(state => state.authReducer)
    const { role1 } = authSlice.actions
    const [isPage, setIsPage] = React.useState<number>(1)
    const [isReport, setIsReport] = React.useState<boolean>(false)
    const [discipline, setDiscipline] = React.useState<IDiscipline>()
    const [dataForJournal, setDataForJournal] = React.useState<IDataForJournal>({
        v_year: null,
        v_group: null,
        v_vid_zanyatie: null,
        v_ws: null
    })
    const [groups, setGroups] = React.useState<IGroups[]>([])
    const [vidZanyatie, setVidZanyatie] = React.useState<IVidZanyatie[]>([])

    const toReport = (discipline_: IDiscipline, a: IDataForJournal) => {
        setIsReport(true)
        setDataForJournal(a)
        setDiscipline(discipline_)
    }

    const isUi = (): ReactElement => {
        if (isPage == 1) {
            return (
                <Teacher
                    toReport={toReport}
                    vidZanyatie={vidZanyatie}
                    setVidZanyatie={setVidZanyatie}
                    groups={groups}
                    setGroups={setGroups}
                />
            )
        }

        return <SearchStudentTeacher />
    }

    React.useEffect(() => {
        if (id_role != id_role_teacher) {
            dispatch(role1())
        }
    }, [])

    if (isReport) {
        return (
            <JournalReport
                groups={groups}
                vidZanyatie={vidZanyatie}
                credit={discipline?.Krdt}
                isSelect={discipline?.isSelect}
                discipline={discipline?.discipline}
                idDiscipline={discipline?.id_discipline}
                idYear={dataForJournal?.v_year}
                idGroup={dataForJournal?.v_group}
                idVidZanyatie={dataForJournal.v_vid_zanyatie}
                idWs={dataForJournal.v_ws}
                back={setIsReport.bind(null, false)}
            />
        )
    }

    return (
        <>
            <div className={styles.tab}>
                <Tabs isPage={isPage} data={teacherDataTab} changePage={setIsPage} />
            </div>
            {isUi()}
        </>
    )
}

export default TeacherPage
