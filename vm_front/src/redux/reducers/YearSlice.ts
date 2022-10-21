import { IYears } from '../../models/IYear'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchYear } from '../action/yearAction'

interface IYearState {
    years: IYears[]
    isLoaderYear: boolean
}

const initialState: IYearState = {
    years: [],
    isLoaderYear: false
}

export const yearSlice = createSlice({
    initialState,
    name: 'year',
    reducers: {},
    extraReducers: {
        [fetchYear.fulfilled.type]: (state: IYearState, action: PayloadAction<IYears[]>) => {
            state.years = action.payload
            state.isLoaderYear = false
        },
        [fetchYear.pending.type]: (state: IYearState) => {
            state.isLoaderYear = true
        }
    }
})

export default yearSlice.reducer
