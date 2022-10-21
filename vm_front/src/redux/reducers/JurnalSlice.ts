import { IDopusk, IDopuskDetal, IVidDopusk } from '../../models/IJurnals'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchJurnal } from '../action/jurnalAction'

interface IJurnalState {
    dopusk: IDopusk[]
    dopuskDetal: IDopuskDetal[]
    vidDopusk: IVidDopusk[]
}

interface IAction {
    dopusk: IDopusk[]
    dopuskDetal: IDopuskDetal[]
    vidDopusk: IVidDopusk[]
}

const initialState: IJurnalState = {
    dopusk: [],
    dopuskDetal: [],
    vidDopusk: []
}

export const jurnalSlice = createSlice({
    initialState,
    name: 'jurnal',
    reducers: {},
    extraReducers: {
        [fetchJurnal.fulfilled.type]: (state: IJurnalState, action: PayloadAction<IAction>) => {
            state.dopusk = action.payload.dopusk
            state.dopuskDetal = action.payload.dopuskDetal
            state.vidDopusk = action.payload.vidDopusk
        }
    }
})

export default jurnalSlice.reducer
