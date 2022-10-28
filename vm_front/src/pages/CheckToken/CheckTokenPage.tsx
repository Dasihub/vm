import React from 'react'
import { Loader } from '../../components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useHttp } from '../../hooks/useHttp'
import { IRes } from '../../models/IModels'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { authSlice } from '../../redux/reducers/AuthSlice'

interface IResAuth extends IRes {
    data: {
        id_avn_user: number
        id_user: number
        id_role: number
        fullName: string
    }
}

const CheckTokenPage: React.FC = () => {
    const navigate = useNavigate()
    const { accessAuth } = authSlice.actions
    const dispatch = useTypeDispatch()
    const { request } = useHttp()
    const [params] = useSearchParams()

    const check = async () => {
        const token = params.get('token')
        const { data, auth }: IResAuth = await request(`/auth/token?token=${token}`)
        if (!auth) {
            return navigate('/login')
        }
        if (data.id_avn_user > 0) {
            navigate('/main')
        } else {
            navigate('/student')
        }
        dispatch(
            accessAuth({
                id_role: data.id_role,
                id_avn_user: data.id_avn_user,
                id_user: data.id_user,
                isAuth: true
            })
        )
    }

    React.useEffect(() => {
        check()
    }, [])

    console.log('1')

    return (
        <div className="flex justify-content-center align-items-center vh-100">
            <Loader />
        </div>
    )
}

export default CheckTokenPage
