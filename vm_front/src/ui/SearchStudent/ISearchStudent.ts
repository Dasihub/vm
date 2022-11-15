export interface IStudents {
    id_group: number
    id_student: number
    s_fio: string
    groups: string
    rate: string
    faculty: string
}

export interface IStudentsDetails {
    id: string
    discipline: string
    short_name: string
    visitDate: string
    otsenka: string
    t_fio: string
    statusUpd: number
}

export interface ILoader {
    student: boolean
    studentDetail: boolean
}

export interface INoData {
    student: boolean
    studentDetail: boolean
}
