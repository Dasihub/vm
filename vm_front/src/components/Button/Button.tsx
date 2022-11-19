import React from 'react'
import Loader from '../Loader/Loader'
import { IButtonProps } from './IButton'
import styles from './styles.module.scss'

const Button: React.FC<IButtonProps> = ({
    type,
    disabled,
    onClick,
    loader,
    value,
    className = 'bg-color-primary color-light'
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${styles.btn} ${className} flex justify-content-center align-items-center`}
        >
            {loader ? <Loader sm={true} /> : value}
        </button>
    )
}

export default Button
