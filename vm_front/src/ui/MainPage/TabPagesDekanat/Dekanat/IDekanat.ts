import { valueType } from '../../../../components/SelectCustom/ISelect'
import { IRes } from '../../../../models/IModels'

export interface IDekanatProps {
    showModal: () => void
}

export interface IValueSelects {
    v_year: valueType
    v_ws: valueType
    v_semester: valueType
    v_faculty: valueType
    v_feduc: valueType
    v_direction: valueType
    v_speciality: valueType
    v_group: valueType
    v_vid_zanyatie: valueType
    v_date: string
}

export interface ILoader {
    semester: boolean
    faculty: boolean
    feduc: boolean
    direction: boolean
    speciality: boolean
    group: boolean
    vid_zanyatie: boolean
    student: boolean
}

export interface ISemester {
    id_semester: number
    semester: string
}

export interface IFaculties {
    id_faculty: number
    faculty: string
}

export interface IFeduc {
    id_f_educ: number
    f_educ: string
}

export interface IDirection {
    id_direction: number
    direction: string
}

export interface ISpecialities {
    id_speciality: number
    special: string
}

export interface IGroups {
    id_group: number
    p20: string
}

export interface IVidZanyatie {
    id_vid_zaniatiy: number
    vid_zaniatiy: string
}

export interface IStudents {
    id_student: string
    s_fio: string
    id_leave: number
    leave: string
    colors: string
    id_studentJournalVisit: string
    id_educ_sh: number
    discipline: string
    t_fio: string
    visitDate: string
    id_otsenka: number
    otsenka: string
}

export interface IResFeduc extends IRes {
    data: IFeduc[]
}

export interface IResSemester extends IRes {
    data: ISemester[]
}
