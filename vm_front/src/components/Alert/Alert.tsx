import React from 'react'
import styles from './style.module.scss'
import { Button } from '../index'
import { IPropsAlert } from './IAlert'
import { useTranslation } from 'react-i18next'

const Alert: React.FC<IPropsAlert> = ({ hide, confirm }) => {
    const { t } = useTranslation()

    return (
        <div className={styles.container}>
            <div className="flex justify-content-between align-items-center">
                <strong>Внимание</strong>
                <i onClick={hide} className="fa-solid fa-xmark" />
            </div>
            <div className="mt-3 text-center" style={{ fontSize: '18px' }}>
                Вы действительно хотите удалить
            </div>
            <div className="flex justify-content-between align-items-center mt-3">
                <Button value="Да" className="bg-color-dark color-light" onClick={confirm} />
                <Button value="Нет" className="bg-color-light color-dark" onClick={hide} />
            </div>
        </div>
    )
}

export default Alert
