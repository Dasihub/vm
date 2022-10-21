import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IState {
    lang: number
}

const initialState: IState = {
    lang: 1
}

export const LangSlice = createSlice({
    initialState,
    name: 'lang',
    reducers: {
        changeLang: (state: IState, action: PayloadAction<number>) => {
            state.lang = action.payload
        }
    }
})

export default LangSlice.reducer
