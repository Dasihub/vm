import {
    IDirection,
    IFaculties,
    IFeduc,
    IGroups,
    ILoader,
    ISemester,
    ISpecialities,
    IValueSelects,
    IVidZanyatie
} from '../../../pages/MainPage/IMain'
import { valueType } from '../../../components/SelectCustom/ISelect'

export interface ISelectsMainIProps {
    valueSelects: IValueSelects
    specialities: ISpecialities[]
    vidZanyatie: IVidZanyatie[]
    faculties: IFaculties[]
    direction: IDirection[]
    semester: ISemester[]
    groups: IGroups[]
    feduc: IFeduc[]
    changeYear: (v: valueType) => void
    changeWs: (v: valueType) => void
    changeSemester: (v: valueType) => void
    changeFaculties: (v: valueType) => void
    changeFeduc: (v: valueType) => void
    changeDirection: (v: valueType) => void
    changeSpeciality: (v: valueType) => void
    changeGroup: (v: valueType) => void
    changeVidZanyatie: (v: valueType) => void
    isLoader: ILoader
}
