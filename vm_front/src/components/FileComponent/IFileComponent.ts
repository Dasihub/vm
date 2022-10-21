import { ChangeEvent } from 'react'

export interface IFileProps {
    id: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
