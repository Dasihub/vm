import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import { fetchUserInfo } from '../action/userInfoAction'

const initialState: IUser = {
    AVN_login: '',
    surname: '',
    name: '',
    patronymic: '',
    id_group: null,
    name_group: ''
}

const UserInfoSlice = createSlice({
    initialState,
    name: 'user-info',
    reducers: {},
    extraReducers: {
        [fetchUserInfo.fulfilled.type]: (state: IUser, action: PayloadAction<IUser>) => {
            const { patronymic, name_group, name, id_group, surname, AVN_login } = action.payload
            state.patronymic = patronymic
            state.AVN_login = AVN_login
            state.surname = surname
            state.name = name
            state.name_group = name_group
            state.id_group = id_group
        }
    }
})

export default UserInfoSlice.reducer
