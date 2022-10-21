import React from 'react'
import { useTranslation } from 'react-i18next'
import { En, Kg, Ru } from '../../img'
import { IHeaderProps } from './IHeader'
import styles from './styles.module.scss'
import { useTypeDispatch } from '../../hooks/useTypeDispatch'
import { LangSlice } from '../../redux/reducers/LangSlice'

const Header: React.FC<IHeaderProps> = ({ auth }) => {
    const dispatch = useTypeDispatch()
    const { changeLang } = LangSlice.actions
    const isLeft: string = auth ? '240px' : '0px'
    const isWidth: string = auth ? 'calc(100% - 240px)' : '100%'

    const lang: string | null = localStorage.getItem('lang') || null

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
            className="bg-color-light position-fixed top-0 flex justify-content-between p-l-r-2 align-items-center color-dark"
            style={{ minHeight: '60px', zIndex: 3, backgroundColor: '#f7f9fc', left: isLeft, width: isWidth }}
        >
            <div className="w-100">{/*<img src={AVN} style={{ width: '70px' }} alt="avn" />*/}</div>
            <h2 className="w-100 text-center" style={{ textTransform: 'uppercase' }}>
                {t('app')}
            </h2>
            <div className="w-100" style={{ textAlign: 'right' }}>
                <div
                    // onMouseOver={setIsSelect.bind(null, true)}
                    // onMouseLeave={setIsSelect.bind(null, false)}
                    className={styles.flag}
                    // style={isSelect ? { height: '150px' } : { height: '50px' }}
                >
                    <div className={styles.items} style={lang === 'kg' ? { order: 0, background: '#2684ff' } : { order: 1 }}>
                        <img title="Кыргыз тил" src={Kg} alt="kg" onClick={change.bind(null, 'kg')} />
                    </div>
                    <div className={styles.items} style={lang === 'ru' ? { order: 0, background: '#2684ff' } : { order: 1 }}>
                        <img title="Русский язык" src={Ru} alt="ru" onClick={change.bind(null, 'ru')} />
                    </div>
                    <div className={styles.items} style={lang === 'en' ? { order: 0, background: '#2684ff' } : { order: 1 }}>
                        <img title="English language" src={En} alt="en" onClick={change.bind(null, 'en')} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
