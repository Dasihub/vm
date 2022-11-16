import React from 'react'
import { IInputProps } from './IInput'
import styles from './styles.module.scss'

const Input: React.FC<IInputProps> = ({
    value,
    readOnly,
    name,
    label,
    id,
    placeholder,
    onChange,
    className,
    isPassword,
    changeIsPassword,
    required,
    type = 'text',
    maxLength,
    min,
    max,
    style
}) => {
    return (
        <>
            {label?.length && (
                <>
                    <label style={{ fontWeight: 'bold', color: '#454545' }} htmlFor={id}>
                        {label}
                    </label>
                    <br />
                </>
            )}
            <input
                value={value}
                className={`${styles.input} ${className}`}
                name={name}
                readOnly={readOnly}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                maxLength={maxLength}
                min={min}
                max={max}
                style={style}
                type={type == 'password' ? (isPassword ? 'text' : 'password') : type}
            />
        </>
    )
}

export default Input
