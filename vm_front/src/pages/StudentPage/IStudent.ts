import { valueType } from '../../components/SelectCustom/ISelect'

export interface IValueSelect {
    v_year: valueType
    v_semester: valueType
    v_teacher: valueType
}

export interface ILoader {
    discipline: boolean
    semester: boolean
    teacher: boolean
    journal: boolean
}

export interface IDiscipline {
    id_studentJournalVisit: string
    id_discipline: number
    discipline: string
    isSelect: number | boolean
    credits: number
    num: number
}

export interface ISemester {
    id_semester: number
    p43: string
}

export interface ITeacher {
    id_teacher: number
    t_fio: string
}

export interface IJournal {
    id_studentJournalVisit: string
    visitDate: string
    id_vid_zaniatiy: number
    short_name: string
    timesCount: number
    id_educ_sh: number
    id_otsenka: number
    otsenka: string
}
