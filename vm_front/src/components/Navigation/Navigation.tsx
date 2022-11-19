import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'
import { Avatar } from '../../img'
import { INavigationProps } from './INavigation'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { Exit, Square } from '../../icons'
import { access_dekanat, id_role_dekanat, id_role_student, id_role_teacher } from '../../config/roles'
import { url } from '../../config/url'

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
                <div className="flex justify-content-center">
                    <img src={Avatar} alt="avatar" style={{ borderRadius: '50%', width: '50px' }} />
                </div>
                <div className="text-center color-light mt-1">
                    {surname} {name}
                </div>
                <nav className="mt-2">
                    {id_role == id_role_teacher || id_role == id_role_dekanat ? (
                        <>
                            {access == access_dekanat ? (
                                <NavLink
                                    onClick={changeMenu.bind(null, false)}
                                    to={`${url}/dekanat`}
                                    className={funcActive}>
                                    <div className={`${styles.link} flex color-light gap-3`}>
                                        <div
                                            style={{ width: '25px' }}
                                            className="flex justify-content-center align-items-center">
                                            <img src={Square} alt="square" />
                                        </div>
                                        Деканат
                                    </div>
                                </NavLink>
                            ) : null}
                            <NavLink
                                onClick={changeMenu.bind(null, false)}
                                to={`${url}/teacher`}
                                className={funcActive}>
                                <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                                    <div
                                        style={{ width: '25px' }}
                                        className="flex justify-content-center align-items-center">
                                        <img src={Square} alt="square" />
                                    </div>
                                    Преподаватель
                                </div>
                            </NavLink>
                        </>
                    ) : null}
                    {id_role == id_role_student ? (
                        <>
                            <NavLink onClick={changeMenu.bind(null, false)} to={`${url}/passes`} className={funcActive}>
                                <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                                    <div
                                        style={{ width: '25px' }}
                                        className="flex justify-content-center align-items-center">
                                        <img src={Square} alt="square" />
                                    </div>
                                    Пропуски
                                </div>
                            </NavLink>
                            {/*<NavLink onClick={changeMenu.bind(null, false)} to={`${url}/student`} className={funcActive}>*/}
                            {/*    <div className={`${styles.link}  mt-2 flex color-light gap-3`}>*/}
                            {/*        <div*/}
                            {/*            style={{ width: '25px' }}*/}
                            {/*            className="flex justify-content-center align-items-center"*/}
                            {/*        >*/}
                            {/*            <img src={Square} alt="square" />*/}
                            {/*        </div>*/}
                            {/*        Журнал*/}
                            {/*    </div>*/}
                            {/*</NavLink>*/}
                            <NavLink
                                onClick={changeMenu.bind(null, false)}
                                to={`${url}/payment`}
                                className={({ isActive }) => (isActive ? styles.active_link : '')}>
                                <div className={`${styles.link}  mt-2 flex color-light gap-3`}>
                                    <div
                                        style={{ width: '25px' }}
                                        className="flex justify-content-center align-items-center">
                                        <img src={Square} alt="square" />
                                    </div>
                                    Оплата
                                </div>
                            </NavLink>
                        </>
                    ) : null}
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={logout}
                        className={`${styles.link}  mt-2 flex color-light gap-3`}>
                        <img src={Exit} alt="exit" />
                        Выход
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navigation
