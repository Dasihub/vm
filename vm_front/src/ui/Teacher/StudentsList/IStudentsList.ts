import { valueType } from '../../../components/SelectCustom/ISelect'
import { IGrade, IStudentList } from '../Teacher/ITeacher'

export interface IStudentsListProps {
    index: number
    item: IStudentList
    setStudent: (pre: IStudentList) => void
    grade: IGrade[]
    updateOtsenkaApi: (v: valueType) => void
}
