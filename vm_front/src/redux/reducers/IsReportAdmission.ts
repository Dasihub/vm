import { createSlice } from '@reduxjs/toolkit'

type typeIs = {
    is: boolean
}

const initialState: typeIs = {
    is: false
}

export const isReportAdmission = createSlice({
    initialState,
    name: 'admission',
    reducers: {
        showAdmissionReport: state => {
            state.is = true
        },
        hideAdmissionReport: state => {
            state.is = false
        }
    }
})

export default isReportAdmission.reducer
