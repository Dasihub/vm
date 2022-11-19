import React from 'react'
import { ITextAreaProps } from './ITextArea'
import styles from './styles.module.scss'

const TextArea: React.FC<ITextAreaProps> = ({ label, name, value }) => {
    return (
        <>
            {label?.length && (
                <>
                    <label style={{ fontWeight: 'bold', color: '#454545' }}>{label}</label>
                    <br />
                </>
            )}
            <textarea className={styles.textarea} name={name}>
                {value}
            </textarea>
        </>
    )
}

export default TextArea
