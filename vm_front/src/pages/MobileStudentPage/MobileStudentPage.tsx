import React from 'react'
import styles from './style.module.scss'
import { ModalWindow, SelectCustom } from '../../components'
import { useTypeSelector } from '../../hooks/useTypeSelector'

const MobileStudentPage: React.FC = () => {
    const { years } = useTypeSelector(state => state.yearReducer)
    const [isModal, setIsModal] = React.useState(false)

    const showModal = () => {
        setIsModal(true)
    }

    return (
        <div>
            {isModal && (
                <ModalWindow title="Выберите параметры" hide={setIsModal.bind(null, false)}>
                    <>
                        <div className="mt-2">
                            <SelectCustom
                                options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                                value="Учебный год"
                                placeholder="Учебный год"
                            />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Полугодие" placeholder="Полугодие" />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Дисциплина" placeholder="Дисциплина" />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Семестр" placeholder="Семестр" />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Группа" placeholder="Группа" />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Вид занятие" placeholder="Вид занятие" />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Количество раз" placeholder="Количество раз" />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Дата посещения" placeholder="Дата посещения" />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Тип группы" placeholder="Тип группы" />
                        </div>
                        <div className="mt-2">
                            <SelectCustom options={[]} value="Подгруппа" placeholder="Подгруппа" />
                        </div>
                    </>
                </ModalWindow>
            )}
            <div className={styles.choose} onClick={showModal}>
                Выберите параметры <i className="fa-solid fa-sliders" />
            </div>
        </div>
    )
}

export default MobileStudentPage
