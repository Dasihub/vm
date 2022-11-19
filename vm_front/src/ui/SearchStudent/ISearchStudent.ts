export interface IStudents {
    id_group: number
    id_student: number
    s_fio: string
    groups: string
    rate: string
    faculty: string
}

export interface IStudentsDetails {
    id: number
    discipline: string
    short_name: string
    visitDate: string
    otsenka: string
    t_fio: string
    statusUpd: number
    working_off: string
    price: number
    shifr: string
    paymentStatus: string
    priceDefault: number
    id_T_StudentJournalVisit_working_off: number
    id_otsenka: number
    printer: number
}

export interface ILoader {
    student: boolean
    studentDetail: boolean
}

export interface INoData {
    student: boolean
    studentDetail: boolean
}

export interface IWorking {
    id_T_StudentJournalVisit_working_off: number
    s_working_off_name: string
    working_off_name: string
    working_off_status: number
}
