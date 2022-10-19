import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../config/request'
import { IUser } from '../../models/IUser'

export const fetchUserInfo = createAsyncThunk<IUser, number | null>('user-info/fetch', async (id_avn_user, thunkApi) => {
    try {
        const { data }: { data: IUser } = await request(`/user/${id_avn_user}`)
        return {
            AVN_login: data.AVN_login,
            surname: data.surname,
            name: data.name,
            patronymic: data.patronymic
        }
    } catch (e) {
        return thunkApi.rejectWithValue('Ошибка')
    }
})
