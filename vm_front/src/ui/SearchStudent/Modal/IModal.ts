import { IGrade } from '../../../models/IGrade'
import { IWorking } from '../ISearchStudent'
import { valueType } from '../../../components/SelectCustom/ISelect'

export interface IModalProps {
    hideModal: () => void
    grade: IGrade[]
    working: IWorking[]
    idWorking: number | null
    idOtsenka: number | null
    status: string
    updateJournal: (
        cipher: string,
        description: string,
        id_otsenka_new: number | string | null,
        id_working_new: number | string | null
    ) => void
}

export interface IValueModalInput {
    cipher: string
    description: string
}

export interface IValueSelects {
    v_working: valueType
    v_otsenka: valueType
}
