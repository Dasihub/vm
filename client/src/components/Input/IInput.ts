import { ChangeEvent } from 'react'

export interface IInputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    id?: string
    label?: string
    name?: string
    readOnly?: boolean
    isPassword?: boolean
    required?: boolean
    className?: string
    type?: 'text' | 'date' | 'password' | 'number' | 'file'
    changeIsPassword?: () => void
    maxLength?: number
    min?: string
    max?: string
}
