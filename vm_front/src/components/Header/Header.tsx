import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { En, Kg, Ru } from '../../img'
import { IHeaderProps } from './IHeader'
import styles from './styles.module.scss'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { LangSlice } from '../../redux/reducers/LangSlice'
import { useTypeSelector } from '../../hooks/useTypeSelector'

const Header: React.FC<IHeaderProps> = ({ changeMenu, isNavigation }) => {
    const dispatch = useTypeDispatch()
    const { changeLang } = LangSlice.actions
    const lang: string | null = localStorage.getItem('lang')
    const { isAuth } = useTypeSelector(state => state.authReducer)

    const { i18n, t } = useTranslation()

    const change = (lng: string) => {
        i18n.changeLanguage(lng)

        switch (lng) {
            case 'kg':
                dispatch(changeLang(2))
                break
            case 'en':
                dispatch(changeLang(3))
                break
            default:
                dispatch(changeLang(1))
                break
        }
    }

    return (
        <header
            className={`${
                isNavigation ? styles.active_menu : styles.menu
            } bg-color-light position-fixed top-0 flex justify-content-between p-l-r-2 align-items-center color-dark w-100`}>
            <div className="w-100">
                {isAuth && (
                    <div className={styles.burger} onClick={changeMenu}>
                        <div className={`${styles.line} ${isNavigation ? styles.line_1 : ''}`}></div>
                        <div className={`${styles.line} ${isNavigation ? styles.line_2 : ''}`}></div>
                        <div className={`${styles.line} ${isNavigation ? styles.line_3 : ''}`}></div>
                    </div>
                )}
            </div>
            <h2 className={styles.title}>{t('app')}</h2>
            <div className="w-100" style={{ textAlign: 'right' }}>
                <div
                    // onMouseOver={setIsSelect.bind(null, true)}
                    // onMouseLeave={setIsSelect.bind(null, false)}
                    className={styles.flag}
                    // style={isSelect ? { height: '150px' } : { height: '50px' }}
                >
                    <div
                        className={styles.items}
                        style={lang === 'kg' ? { order: 0, background: '#2684ff', color: 'white' } : { order: 1 }}
                        onClick={change.bind(null, 'kg')}>
                        {/*<img title="Кыргыз тил" src={Kg} alt="kg" onClick={change.bind(null, 'kg')} />*/}
                        <span>Кыр</span>
                    </div>
                    <div
                        className={styles.items}
                        style={lang === 'ru' ? { order: 0, background: '#2684ff', color: 'white' } : { order: 1 }}
                        onClick={change.bind(null, 'ru')}>
                        {/*<img title="Русский язык" src={Ru} alt="ru" onClick={change.bind(null, 'ru')} />*/}
                        <span>Ру</span>
                    </div>
                    <div
                        className={styles.items}
                        style={lang === 'en' ? { order: 0, background: '#2684ff', color: 'white' } : { order: 1 }}
                        onClick={change.bind(null, 'en')}>
                        {/*<img title="English language" src={En} alt="en" onClick={change.bind(null, 'en')} />*/}
                        <span>En</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
