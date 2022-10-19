export interface IRes {
    message: string
    type: 'error' | 'info' | 'warn' | 'success'
    auth: boolean
}
