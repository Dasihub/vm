import { basesUrl } from '../hooks/useHttp'

export const request = async (
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
    body: any = null,
    headers: any = {}
) => {
    if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
        headers['Cache-Control'] = 'no-cache'
    }
    const res: Response = await fetch(basesUrl + url, { method, body, headers })
    const data = await res.json()

    return data
}
