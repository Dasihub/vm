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
    max
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
            <div className="position-relative" style={{ width: '100%', marginTop: '5px' }}>
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
                    type={type == 'password' ? (isPassword ? 'text' : 'password') : type}
                />
                {type == 'password' ? (
                    isPassword ? (
                        <i onClick={changeIsPassword} className={`fa-sharp fa-solid fa-eye ${styles.i} color-primary position-absolute`}></i>
                    ) : (
                        <i onClick={changeIsPassword} className={`fa-sharp fa-solid fa-eye-slash ${styles.i} color-primary position-absolute`}></i>
                    )
                ) : null}
            </div>
        </>
    )
}

export default Input
