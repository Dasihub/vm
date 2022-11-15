import React from 'react'
import { toast } from 'react-toastify'

export const useMessage = () => {
    return React.useCallback((text: string, type: 'error' | 'warn' | 'info' | 'success') => {
        toast[type](text, {
            position: 'bottom-left',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })
    }, [])
}
