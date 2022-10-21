import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'
import { IRes } from '../../models/IModels'
import { useMessage } from '../../hooks/useMessage'
import { useHttp } from '../../hooks/useHttp'
import { authSlice } from '../../redux/reducers/AuthSlice'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { Avatar } from '../../img'
import { INavigationProps } from './INavigation'
import { useTypeSelector } from '../../hooks/useTypeSelector'

const Navigation: React.FC<INavigationProps> = () => {
    const toast = useMessage()
    const { request } = useHttp()
    const dispacth = useTypeDispatch()
    const { surname, name } = useTypeSelector(state => state.userInfoReducer)
    const { clearData } = authSlice.actions
    const funcActive = ({ isActive }: { isActive: boolean }) => {
        return isActive ? styles.active_link : ''
    }

    const logout = async () => {
        const { auth, message, type }: IRes = await request('/auth/logout')
        toast(message, type)
        dispacth(clearData())
    }

    return (
        <div className={styles.links}>
            {/*<div>*/}
            {/*    <img className={`${styles.avatar} block m-auto`} src={Avatar} alt="avatar" />*/}
            {/*</div>*/}
            <div className="flex justify-content-center">
                <img src={Avatar} alt="avatar" style={{ borderRadius: '50%', width: '50px' }} />
            </div>
            <div className="text-center color-light mt-1">
                {surname} {name}
            </div>
            <nav className="mt-2">
                <NavLink to="/main" className={funcActive}>
                    <div className={`${styles.link} flex color-light gap-3`}>
                        <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                            <i className="fa-solid fa-building-columns" />
                        </div>
                        Деканат
                    </div>
                </NavLink>
                <NavLink to="/teacher" className={funcActive}>
                    <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                        <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                            <i className="fa-solid fa-chalkboard-user" />
                        </div>
                        Преподаватель
                    </div>
                </NavLink>
                <NavLink to="/student" className={funcActive}>
                    <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                        <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                            <i className="fa-solid fa-graduation-cap" />
                        </div>
                        Студент
                    </div>
                </NavLink>
                <NavLink to="/report" className={({ isActive }) => (isActive ? styles.active_link : '')}>
                    <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                        <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                            <i className="fa-sharp fa-solid fa-file-word" />
                        </div>
                        Отчеты
                    </div>
                </NavLink>
                <div style={{ cursor: 'pointer' }} onClick={logout} className={`${styles.link}  mt-2 flex color-light gap-3`}>
                    <i className="fa-solid fa-right-from-bracket" />
                    Выход
                </div>
            </nav>
        </div>
    )
}

export default Navigation
