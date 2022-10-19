import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../config/request'
import { IYears } from '../../models/IYear'

export const fetchYear = createAsyncThunk('yaer/fetch', async (_, thunkAPI) => {
    try {
        const { data }: { data: IYears[] } = await request('/selectors/years')

        return data
    } catch (e) {
        return thunkAPI.rejectWithValue('Ошибка')
    }
})
