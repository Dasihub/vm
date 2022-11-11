import React from 'react'
import Router from './pages/Router'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Header, Loader, Navigation, Tabs } from './components'
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
    const navigate = useNavigate()
    const { accessAuth, clearData, role3 } = authSlice.actions
    const { changeLang } = LangSlice.actions
    const { id_avn_user, id_user, isAuth, id_role } = useTypeSelector(state => state.authReducer)
    const dispatch = useTypeDispatch()
    const toast = useMessage()
    const { request } = useHttp()
    const [mainLoader, setMainLoader] = React.useState<boolean>(true)
    const [isNavigation, setIsNavigation] = React.useState<boolean>(false)
    const [access, setAccess] = React.useState<null | number>(null)

    const checkAuth = async () => {
        const { auth, data }: IResAuth = await request('/auth/check')
        setMainLoader(false)
        if (auth) {
            return dispatch(
                accessAuth({
                    id_role: data.id_role,
                    id_avn_user: data.id_avn_user,
                    id_user: data.id_user,
                    isAuth: true
                })
            )
            // setAuth({ id_role: data.id_role, id_avn_user: data.id_avn_user, id_user: data.id_user, auth: true })
        }
        navigate('/login')
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
        if (data?.perm == 1) {
            setAccess(data?.perm)
            dispatch(role3())
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
            dispatch(fetchUserInfo({ id_avn_user, id_user, id_role }))
            dispatch(fetchYear())
            dispatch(fetchSw())
        }

        if (id_role == 1) {
            getAccessDekanat()
        }
    }, [isAuth])

    React.useEffect(() => {
        const pathname = window.location.pathname
        isLang()
        if (pathname != '/token') {
            checkAuth()
        } else {
            setMainLoader(false)
        }
    }, [])

    const changeMenu = (is: boolean) => {
        setIsNavigation(is)
    }

    if (mainLoader) {
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
            <Router />
        </>
    )
}

export default App
