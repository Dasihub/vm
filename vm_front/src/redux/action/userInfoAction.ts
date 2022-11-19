import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../config/request'
import { IUser } from '../../models/IUser'

export const fetchUserInfo = createAsyncThunk<
    IUser,
    { id_avn_user: number | null; id_user: number | null; id_role: number | null }
>('user-info/fetch', async (user, thunkApi) => {
    try {
        const { id_avn_user, id_user, id_role } = user
        const { data }: { data: IUser } = await request(
            `/user?id_user=${id_user}&id_avn=${id_avn_user}&id_role=${id_role}`
        )
        const { name, name_group, surname, id_group, AVN_login, patronymic } = data
        return {
            AVN_login: AVN_login,
            surname: surname,
            name: name,
            patronymic: patronymic,
            name_group: name_group,
            id_group
        }
    } catch (e) {
        return thunkApi.rejectWithValue('Ошибка')
    }
})
