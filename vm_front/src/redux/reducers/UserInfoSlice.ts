import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import { fetchUserInfo } from '../action/userInfoAction'

const initialState: IUser = {
    AVN_login: '',
    surname: '',
    name: '',
    patronymic: ''
}

const UserInfoSlice = createSlice({
    initialState,
    name: 'user-info',
    reducers: {},
    extraReducers: {
        [fetchUserInfo.fulfilled.type]: (state: IUser, action: PayloadAction<IUser>) => {
            state.patronymic = action.payload.patronymic
            state.AVN_login = action.payload.AVN_login
            state.surname = action.payload.surname
            state.name = action.payload.name
        }
    }
})

export default UserInfoSlice.reducer
