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
import { IRes } from './models/IModels'
import { fetchYear } from './redux/action/yearAction'
import { fetchSw } from './redux/action/wsAction'

const App: React.FC = () => {
    const { accessAuth, clearData } = authSlice.actions
    const { changeLang } = LangSlice.actions
    const { id_avn_user, isAuth, id_role } = useTypeSelector(state => state.authReducer)
    const dispatch = useTypeDispatch()
    const toast = useMessage()
    const { request, loaderDefaultTrue } = useHttp()
    const [isNavigation, setIsNavigation] = React.useState<boolean>(false)
    const [access, setAccess] = React.useState<null | number>(null)

    const checkAuth = async () => {
        const { message, type, auth, data }: IResAuth = await request('/auth/check')
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

    const logout = async () => {
        const { message, type }: IRes = await request('/auth/logout')
        toast(message, type)
        dispatch(clearData())
        if (isNavigation) {
            setIsNavigation(false)
        }
    }

    const getAccessDekanat = async () => {
        const { data }: { data: { perm: number; id_avn_user: number } } = await request(`/dekanat/access/${id_avn_user}`)
        setAccess(data?.perm)
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
            dispatch(fetchYear())
            dispatch(fetchSw())
        }

        if (id_role == 1) {
            getAccessDekanat()
        }
    }, [isAuth])

    React.useEffect(() => {
        checkAuth()
        isLang()
    }, [])

    const changeMenu = (is: boolean) => {
        setIsNavigation(is)
    }

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
            <Header changeMenu={changeMenu} isNavigation={isNavigation} />
            {isAuth && <Navigation access={access} logout={logout} changeMenu={changeMenu} isNavigation={isNavigation} />}
            {/*<div style={{ width: '240px' }} />*/}
            <Router />
        </>
    )
}

export default App
