import { FormEvent } from 'react'

export interface IButtonProps {
    value: string
    type?: 'submit' | 'button'
    disabled?: boolean
    onClick?: (e: FormEvent) => void
    loader?: boolean
    className?: string
}
