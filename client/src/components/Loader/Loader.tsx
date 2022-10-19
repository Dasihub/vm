import React from 'react'
import styles from './loader.module.scss'
import { ILoaderProps } from './ILoader'

const Loader: React.FC<ILoaderProps> = ({ isBackground, sm }) => {
    if (isBackground) {
        return (
            <div
                style={{ zIndex: 5, backgroundColor: 'rgba(0,0,0,0.65)' }}
                className="flex justify-content-center align-items-center vh-100 position-fixed w-100 top-0 bg-color-dark"
            >
                <div className={styles.spinner}></div>
            </div>
        )
    }
    if (sm) {
        return <div className={styles.spinnerSm}></div>
    }
    return <div className={styles.spinner}></div>
}

export default Loader
