import { valueType } from '../../../components/SelectCustom/ISelect'
import { IDataForJournal } from '../../../pages/TeacherPage/ITeacher'

export interface ITeacherTabProps {
    toReport: (discipline_: IDiscipline, data: IDataForJournal) => void
    setVidZanyatie: (vidZanyatie: IVidZanyatie[]) => void
    setGroups: (groups: IGroups[]) => void
    vidZanyatie: IVidZanyatie[]
    groups: IGroups[]
}

export interface IValueSelects {
    v_year: valueType
    v_semester: valueType
    v_group: valueType
    v_vid_zanyatie: valueType
    v_amount: valueType
    v_type_group: valueType
    v_sub_group: valueType
    v_otsenka: valueType
    date: string
}

export interface IDiscipline {
    id_w_s: number
    get_ws: number
    ws: string
    ws_sort: number
    id_discipline: number
    discipline: string
    Krdt: number
    isSelect: number
}

export interface ISemester {
    id_semester: number
    semester: string
    isSelect: number
}

export interface IGroups {
    id_group: number
    groups: string
}

export interface IVidZanyatie {
    id_vid_zaniatiy: number
    name_vid_zaniatiy: string
}

export interface IStudentList {
    id_a_year: number
    id_discipline: number
    id_group: number
    id_groupOrPorok: number
    id_otsenka: number
    id_semesterOrWs: number
    id_student: number
    id_studentJournalVisit: number
    id_teacher: number
    id_vid_zaniatiy: number
    isVisited: boolean
    kredits: number
    p20: string
    s_fio: string
    status_upd: number
    timesCount: number
    visitDate: string
}

export interface ISubgroupStudent {
    id_student: number
    s_fio: string
    id_studentJournalVisit_subgroup: null | number
    subgroup: null | number
}

export interface IGrade {
    id_otsenka: number
    otsenka: string
    otsenka_ball: number | null
}

export interface ILoader {
    discipline: boolean
    semester: boolean
    group: boolean
    vidZanyatie: boolean
    student: boolean
    modal: boolean
}
