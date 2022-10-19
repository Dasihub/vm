import { valueType } from '../../../components/SelectCustom/ISelect'

export interface IModalJurnalProps {
    hideModal: () => void
}

export interface IValues {
    dopusk: valueType
    dopuskDetal: valueType
    vidDopusk: valueType
    cipher: string
    date: string
    file: File | null
}
