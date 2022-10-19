import { createAsyncThunk } from '@reduxjs/toolkit'
import { IWs } from '../../models/IWs'
import { request } from '../../config/request'

export const fetchSw = createAsyncThunk('ws/fetch', async (_, thunkApi) => {
    try {
        const { data }: { data: IWs[] } = await request('/selectors/ws')
        return data
    } catch (e) {
        return thunkApi.rejectWithValue('Ошибка')
    }
})
