import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../config/request'
import { IDopusk, IDopuskDetal, IVidDopusk } from '../../models/IJurnals'

export const fetchJurnal = createAsyncThunk('jurnal/fetch', async (_, thunkAPI) => {
    try {
        const resDopusk: { data: IDopusk[] } = await request('/jurnal/dopusk/1')
        const resDopuskDetal: { data: IDopuskDetal[] } = await request('/jurnal/dopusk-detal/1')
        const resVidDopusk: { data: IVidDopusk[] } = await request('/jurnal/vid-dopusk/1')

        return { dopusk: resDopusk.data, dopuskDetal: resDopuskDetal.data, vidDopusk: resVidDopusk.data }
    } catch (e) {
        return thunkAPI.rejectWithValue('Ошибка')
    }
})
