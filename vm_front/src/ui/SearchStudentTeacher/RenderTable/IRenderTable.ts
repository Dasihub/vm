import { IStudentsDetails } from '../../SearchStudent/ISearchStudent'

export interface IRenderTableProps {
    item: IStudentsDetails
    index: number
    showModal: (id_otsenka: number, id_: number, paymentStatus: string, working_off: string) => void
}
