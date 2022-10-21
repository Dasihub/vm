import React from 'react'
import { useMessage } from './useMessage'
import { authSlice } from '../redux/reducers/AuthSlice'
import { useTypeDispatch } from './useTypeDispatch'
import { useTypeSelector } from './useTypeSelector'

export const basesUrl = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : '/api'

export const useHttp = (isDefaultLoad?: boolean) => {
    const toast = useMessage()
    const [loader, setLoader] = React.useState<boolean>(false)
    const [loaderDefaultTrue, setLoaderDefaultTrue] = React.useState<boolean>(true)

    const request = React.useCallback(async (url: string, method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET', body: any = null, headers: any = {}) => {
        try {
            setLoader(true)
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
                headers['Cache-Control'] = 'no-cache'
            }
            const res: Response = await fetch(basesUrl + url, { method, body, headers })
            const data = await res.json()

            return data
        } catch (e) {
            toast('Ошибка в сервере', 'error')
        } finally {
            setLoader(false)
            setLoaderDefaultTrue(false)
        }
    }, [])

    return { request, loader, loaderDefaultTrue }
}
