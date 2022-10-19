import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAuthState {
    id_role: number | null
    id_avn_user: number | null
    id_user: number | null
    isAuth: boolean
}

const initialState: IAuthState = {
    id_role: null,
    id_avn_user: null,
    id_user: null,
    isAuth: false
}

export const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        accessAuth: (state, action: PayloadAction<IAuthState>) => {
            const { isAuth, id_user, id_avn_user, id_role } = action.payload
            state.isAuth = isAuth
            state.id_user = id_user
            state.id_avn_user = id_avn_user
            state.id_role = id_role
        },
        clearData: state => {
            state.isAuth = false
            state.id_user = null
            state.id_avn_user = null
            state.id_role = null
        }
    },
    extraReducers: {}
})

export default authSlice.reducer
