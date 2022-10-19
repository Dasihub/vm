import React from 'react'
import styles from './styles.module.scss'
import { IModalProps } from './IModal'

const ModalWindow: React.FC<IModalProps> = ({ children, title, hide }) => {
    return (
        <div className={styles.background}>
            <div className={styles.modal}>
                <div className={styles.head}>
                    <h1>{title}</h1>
                    <i className="fa-solid fa-xmark" onClick={hide} />
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    )
}

export default ModalWindow
