import React from 'react'
import { Loader } from '../../components'
import { useSearchParams } from 'react-router-dom'
import { useHttp } from '../../hooks/useHttp'

const CheckTokenPage: React.FC = () => {
    const { request } = useHttp()
    const [params] = useSearchParams()

    const check = async () => {
        const token = params.get('token')
        console.log(token)
        const { data } = await request(`/auth/token?token=${token}`)
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
