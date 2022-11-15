import { IGroups, IVidZanyatie } from '../../ui/Teacher/Teacher/ITeacher'

export interface IJournalReportProps {
    credit?: number
    isSelect?: number
    discipline?: string
    idDiscipline?: number
    idWs: number | null | string
    idYear: number | null | string
    idGroup: number | null | string
    idVidZanyatie: number | null | string
    groups: IGroups[]
    vidZanyatie: IVidZanyatie[]
    back: () => void
}

export interface IReportJournal {
    faculty: string
    groups: string
    id_student: number
    id_discipline: number
    credits: number
    id_vid_zaniatiy: number
    id_semesterOrWs: number
    s_fio: string
    visitDate: string
    dates: string
    timesCount: number
    otsenka: string
    nb: number
    otsenka_ball: number
    edit: number
}
