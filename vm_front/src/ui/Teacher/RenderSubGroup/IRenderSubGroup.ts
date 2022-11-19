import { ISubgroupStudent } from '../Teacher/ITeacher'

export interface IRenderSubGroupProps {
    index: number
    item: ISubgroupStudent
    postSubGroupStudent: (
        id_student: number | null,
        subgroup: number | string | null,
        studentSubgroup: null | number
    ) => void
}
