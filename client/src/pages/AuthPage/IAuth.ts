import { IRes } from '../../models/IModels'
import { IAuthState } from '../../redux/reducers/AuthSlice'

export interface IForm {
    login: string
    password: string
}

export interface IResAuth extends IRes {
    data: IAuthState
}
