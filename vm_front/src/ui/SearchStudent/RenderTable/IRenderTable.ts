import { IStudentsDetails } from '../ISearchStudent'

export interface IRenderTableProps {
    item: IStudentsDetails
    index: number
    showModal: (id_working: number, id_otsenka: number, id_: number, status_: string) => void
    changeReport: (id: number) => void
}
