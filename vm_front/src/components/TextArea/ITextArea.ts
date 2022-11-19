import React from 'react'

export interface ITextAreaProps {
    label?: string
    name?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
