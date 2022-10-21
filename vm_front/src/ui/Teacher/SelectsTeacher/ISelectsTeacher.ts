import {
    IDiscipline,
    IGroups,
    ILoader,
    ISemester,
    IStudentList,
    ISubgroupStudent,
    IValueSelects,
    IVidZanyatie
} from '../../../pages/TeacherPage/ITeacher'
import { IYears } from '../../../models/IYear'
import { valueType } from '../../../components/SelectCustom/ISelect'
import { IWs } from '../../../models/IWs'
import { ChangeEvent } from 'react'

export interface ISelectsTeacherProps {
    isModal: boolean
    hideModal: () => void
    showModal: () => void
    loader: ILoader
    discipline: IDiscipline | undefined
    valueSelects: IValueSelects
    studentList: IStudentList[]
    subgroupStudents: ISubgroupStudent[]
    ws: IWs[]
    years: IYears[]
    groups: IGroups[]
    semester: ISemester[]
    disciplines: IDiscipline[]
    vidZanyatie: IVidZanyatie[]
    setStudent: (pre: IStudentList) => void
    changeYear: (v: valueType) => void
    changeWs: (v: valueType) => void
    changeDiscipline: (v: valueType) => void
    changeGroup: (v: valueType) => void
    changeVidZanyatie: (v: valueType) => void
    postSubGroupStudent: (id_student: number | null, subgroup: number | string | null, studentSubgroup: null | number) => void
    changeAmount: (v: valueType) => void
    changeTypeGroup: (v: valueType) => void
    changeSemester: (v: valueType) => void
    changeSubGroup: (v: valueType) => void
    changeDate: (e: ChangeEvent<HTMLInputElement>) => void
    PostEveryoneWasPresent: () => void
    setIsReport: (pre: boolean) => void
}
