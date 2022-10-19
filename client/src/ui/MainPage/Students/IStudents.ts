import { IStudents } from '../../../pages/MainPage/IMain'

export interface IStudentsProps {
    students: IStudents[]
    showModal: () => void
}

export interface ITdProps {
    educGrouped: any
    idStudent: any
    idDiscipline: any
    idDate: any
}
