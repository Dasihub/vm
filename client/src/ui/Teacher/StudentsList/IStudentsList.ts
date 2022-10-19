import { IGrade, IStudentList } from '../../../pages/TeacherPage/ITeacher'
import { valueType } from '../../../components/SelectCustom/ISelect'

export interface IStudentsListProps {
    index: number
    item: IStudentList
    setStudent: (pre: IStudentList) => void
    grade: IGrade[]
    updateOtsenkaApi: (v: valueType) => void
}
