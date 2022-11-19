import { IGrade } from '../../../models/IGrade'

export interface IModalProps {
    hideModal: () => void
    grade: IGrade[]
    idOtsenka: number | null
    working: string
    status: string
    updateJournal: (id_otsenka_new: number | string | null) => void
}
