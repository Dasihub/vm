import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sad } from '../../img'
import styles from './styles.module.scss'

const Error404: React.FC = () => {
    return (
        <div className="color-primary text-center vh-100 flex justify-content-center align-items-center">
            <div>
                <img src={Sad} className={styles.sad} alt="sad" />
                <h1>404</h1>
                <h2>Страница не найдено!</h2>
                <NavLink to="/" className="color-primary" style={{ textDecoration: 'underline' }}>
                    Вернуться на главную страницу
                </NavLink>
            </div>
        </div>
    )
}

export default Error404
