export interface IAdmissionReportProps {
    id: number | null
    back: () => void
}

export interface IAdmission {
    datePrint: string
    discipline: string
    endDate: string
    faculty: string
    groups: string
    n_director: string
    rate: string
    s_fio: string
    shifr: number
    visitDate: string
    years: string
}
