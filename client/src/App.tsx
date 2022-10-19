import React from 'react'
import Router from './pages/Router'
import { Header, Loader, Navigation } from './components'
import { ToastContainer } from 'react-toastify'
import { useHttp } from './hooks/useHttp'
import { useMessage } from './hooks/useMessage'
import { IResAuth } from './pages/AuthPage/IAuth'
import { authSlice } from './redux/reducers/AuthSlice'
import { useTypeDispatch } from './hooks/useTypeDispatch'
import { useTypeSelector } from './hooks/useTypeSelector'
import { fetchUserInfo } from './redux/action/userInfoAction'
import { LangSlice } from './redux/reducers/LangSlice'

const App: React.FC = () => {
    const { accessAuth } = authSlice.actions
    const { changeLang } = LangSlice.actions
    const { id_avn_user, isAuth } = useTypeSelector(state => state.authReducer)
    const dispatch = useTypeDispatch()
    const toast = useMessage()
    const { request, loaderDefaultTrue } = useHttp()

    const checkAuth = async () => {
        const { message, type, auth, data }: IResAuth = await request('/auth/check')
        toast(message, type)
        if (auth) {
            dispatch(
                accessAuth({
                    id_role: data.id_role,
                    id_avn_user: data.id_avn_user,
                    id_user: data.id_user,
                    isAuth: true
                })
            )
            // setAuth({ id_role: data.id_role, id_avn_user: data.id_avn_user, id_user: data.id_user, auth: true })
        }
    }

    const isLang = () => {
        const l: null | string = localStorage.getItem('lang')

        switch (l) {
            case 'kg':
                dispatch(changeLang(2))
                break
            case 'en':
                dispatch(changeLang(3))
                break
            default:
        }
    }

    React.useEffect(() => {
        if (isAuth) {
            dispatch(fetchUserInfo(id_avn_user))
        }
    }, [isAuth])

    React.useEffect(() => {
        checkAuth()
        isLang()
    }, [])

    if (loaderDefaultTrue) {
        return (
            <div className="vh-100 flex justify-content-center align-items-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <ToastContainer />
            <Header auth={isAuth} />
            {isAuth && <Navigation />}
            {/*<div style={{ width: '240px' }} />*/}
            <Router auth={isAuth} />
        </>
    )
}

export default App
