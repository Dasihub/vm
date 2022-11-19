import { combineReducers, configureStore } from '@reduxjs/toolkit'
import jurnalReducer from './reducers/JurnalSlice'
import yearReducer from './reducers/YearSlice'
import wsReducer from './reducers/WsSlice'
import authReducer from './reducers/AuthSlice'
import userInfoReducer from './reducers/UserInfoSlice'
import langReducer from './reducers/LangSlice'
import isAdmissionReducer from './reducers/IsReportAdmission'

const rootReducer = combineReducers({
    userInfoReducer,
    jurnalReducer,
    authReducer,
    yearReducer,
    wsReducer,
    langReducer,
    isAdmissionReducer
})

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV == 'development'
    })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
