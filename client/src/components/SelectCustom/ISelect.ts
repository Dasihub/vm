import { FocusEventHandler } from 'react'

export type valueType = { value: number | null | string; label: string }

export interface ISelectProps {
    label?: string
    placeholder?: string
    value?: valueType | number | string
    options: valueType[]
    onChange?: (pre: any) => void
    loader?: boolean
    isDisabled?: boolean
    onFocus?: FocusEventHandler<HTMLInputElement>
}
