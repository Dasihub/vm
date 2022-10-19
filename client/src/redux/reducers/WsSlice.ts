import { IWs } from '../../models/IWs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSw } from '../action/wsAction'

interface IWsState {
    ws: IWs[]
    isLoaderWs: boolean
}

const initialState: IWsState = {
    ws: [],
    isLoaderWs: false
}

export const wsSlice = createSlice({
    initialState,
    name: 'ws',
    reducers: {},
    extraReducers: {
        [fetchSw.fulfilled.type]: (state: IWsState, action: PayloadAction<IWs[]>) => {
            state.ws = action.payload
            state.isLoaderWs = false
        },
        [fetchSw.pending.type]: (state: IWsState) => {
            state.isLoaderWs = true
        }
    }
})

export default wsSlice.reducer
