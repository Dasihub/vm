import { ReactElement } from 'react'

export interface IModalProps {
    children: ReactElement
    title: string | ReactElement
    hide: () => void
    isScroll?: boolean
}
