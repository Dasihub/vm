import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'
import { authSlice } from '../../redux/reducers/AuthSlice'
import { Avatar } from '../../img'
import { INavigationProps } from './INavigation'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { Exit, Square } from '../../icons'

const Navigation: React.FC<INavigationProps> = ({ isNavigation, changeMenu, logout, access }) => {
    const { surname, name } = useTypeSelector(state => state.userInfoReducer)
    const { id_role } = useTypeSelector(state => state.authReducer)
    const funcActive = ({ isActive }: { isActive: boolean }) => {
        return isActive ? styles.active_link : ''
    }

    return (
        <>
            {isNavigation && <div className={styles.fon} onClick={changeMenu.bind(null, false)} />}
            <div className={isNavigation ? `${styles.links} ${styles.active}` : `${styles.links}`}>
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
                    {id_role == 1 || id_role == 3 ? (
                        <>
                            {access == 1 ? (
                                <NavLink onClick={changeMenu.bind(null, false)} to="/dekanat" className={funcActive}>
                                    <div className={`${styles.link} flex color-light gap-3`}>
                                        <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                                            <img src={Square} alt="square" />
                                        </div>
                                        Деканат
                                    </div>
                                </NavLink>
                            ) : null}
                            <NavLink onClick={changeMenu.bind(null, false)} to="/teacher" className={funcActive}>
                                <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                                    <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                                        <img src={Square} alt="square" />
                                    </div>
                                    Преподаватель
                                </div>
                            </NavLink>
                        </>
                    ) : null}
                    {id_role == 2 ? (
                        <>
                            <NavLink onClick={changeMenu.bind(null, false)} to="/passes" className={funcActive}>
                                <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                                    <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                                        <img src={Square} alt="square" />
                                    </div>
                                    Пропуски
                                </div>
                            </NavLink>
                            <NavLink onClick={changeMenu.bind(null, false)} to="/student" className={funcActive}>
                                <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                                    <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                                        <img src={Square} alt="square" />
                                    </div>
                                    Журнал
                                </div>
                            </NavLink>
                            <NavLink
                                onClick={changeMenu.bind(null, false)}
                                to="/pay"
                                className={({ isActive }) => (isActive ? styles.active_link : '')}>
                                <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                                    <div style={{ width: '25px' }} className="flex justify-content-center align-items-center">
                                        <img src={Square} alt="square" />
                                    </div>
                                    Оплата нб
                                </div>
                            </NavLink>
                        </>
                    ) : null}
                    <div style={{ cursor: 'pointer' }} onClick={logout} className={`${styles.link}  mt-2 flex color-light gap-3`}>
                        <img src={Exit} alt="exit" />
                        Выход
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navigation
