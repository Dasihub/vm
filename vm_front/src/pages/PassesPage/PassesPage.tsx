import React from 'react'
import { Button, Input, Loader, ModalWindow, SelectCustom } from '../../components'
import { valueType } from '../../components/SelectCustom/ISelect'
import { useHttp } from '../../hooks/useHttp'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { IStudentsDetails } from '../../ui/SearchStudent/ISearchStudent'
import styles from '../../ui/SearchStudent/styles.module.scss'

const PassesPage: React.FC = () => {
    const { request, loader } = useHttp()
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { id_user, id_role, id_avn_user } = useTypeSelector(state => state.authReducer)
    const { id_group } = useTypeSelector(state => state.userInfoReducer)
    const { ws, isLoaderWs } = useTypeSelector(state => state.wsReducer)
    const [valueYear, setValueYear] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [valueWs, setValueWs] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [journalDetails, setJournalDetails] = React.useState<IStudentsDetails[]>([])
    const [chooseJournal, setChooseJournal] = React.useState<IStudentsDetails[]>([])
    const [isModal, setIsModal] = React.useState<boolean>(false)
    const [noData, setNoData] = React.useState<boolean>(false)

    console.log(chooseJournal, 'chooseJournal')
    const choose = (e: React.ChangeEvent<HTMLInputElement>, j: IStudentsDetails) => {
        if (e.target.checked) {
            return setChooseJournal(pre => (pre = [...pre, j]))
        }
        setChooseJournal(pre => (pre = pre.filter(item => item.id !== j.id)))
    }

    const changeYear = (v: valueType) => {
        setValueYear(v)
    }

    const changeWs = (v: valueType) => {
        setValueWs(v)
        getJournal(v.value)
    }

    const getJournal = async (ws: null | number | string) => {
        if (noData) {
            setNoData(false)
        }

        if (journalDetails.length) {
            setJournalDetails([])
        }

        const { data } = await request(
            `/teacher/search-student-detail?id_year=${valueYear.value}&id_ws=${ws}&id_role=${id_role}&id_avn_user=${id_avn_user}&id_user=${id_user}&id_group=${id_group}&id_student=${id_user}`
        )
        if (data.length) {
            return setJournalDetails(data)
        }
        setNoData(true)
    }

    const showModal = () => {
        document.body.style.overflowY = 'hidden'
        setIsModal(true)
    }

    const hideModal = () => {
        document.body.style.overflowY = 'visible'
        setIsModal(false)
    }

    React.useEffect(() => {
        if (years.length) {
            // @ts-ignore
            const { id_a_year, p32 } = years.find(item => item.defaultValue == 1)
            setValueYear({ label: p32, value: id_a_year })
        }
    }, [years])

    return (
        <>
            {isModal && (
                <ModalWindow title="Оформление" hide={hideModal}>
                    <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className="text-center">№</th>
                                    <th className="text-center">Дисциплина</th>
                                    <th className="text-center">Вид занятие</th>
                                    <th className="text-center">Дата</th>
                                    <th className="text-center">Оценка</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chooseJournal.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{item.discipline}</td>
                                        <td className="text-center">{item.short_name}</td>
                                        <td className="text-center">{item.visitDate}</td>
                                        <td className="text-center">{item.otsenka}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-content-end mt-2">
                            <Button value="Квитанция" />
                        </div>
                    </>
                </ModalWindow>
            )}
            <div className="box_container">
                <div className={styles.container}>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Учебный год"
                            label="Учебный год"
                            value={valueYear}
                            options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                            onChange={changeYear}
                            loader={isLoaderYear}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Полугодие"
                            label="Полугодие"
                            value={valueWs.value ? valueWs : ''}
                            options={ws.map(item => ({ value: item.id_ws, label: item.ws }))}
                            onChange={changeWs}
                            loader={isLoaderWs}
                        />
                    </div>
                </div>
            </div>
            <div style={{ minHeight: '200px' }} className="box_container w-100 mt-2">
                {loader && (
                    <div className="flex justify-content-center mt-2">
                        <Loader />
                    </div>
                )}
                <div style={{ height: '64vh', overflowY: 'auto' }}>
                    {noData && <p className="text-center mt-2">Данные не найдены!</p>}
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className="text-center">№</th>
                                <th className="text-center">Дисциплина</th>
                                <th className="text-center">Вид занятие</th>
                                <th className="text-center">Дата</th>
                                <th className="text-center">Оценка</th>
                                <th className="text-center">Тип отработки</th>
                                <th className="text-center">Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {journalDetails.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{item.discipline}</td>
                                    <td className="text-center">{item.short_name}</td>
                                    <td className="text-center">{item.visitDate}</td>
                                    <td className="text-center">{item.otsenka}</td>
                                    <td className="text-center">{item.working_off}</td>
                                    <td className="text-center">
                                        {!!item.statusUpd && (
                                            <Input
                                                onChange={e => choose(e, item)}
                                                value={item.id}
                                                type="checkbox"
                                                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                            />
                                            // <input
                                            //     onChange={choose}
                                            //     type="checkbox"
                                            //     style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                            // />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-content-end">
                    <Button value="Оформление" onClick={showModal} />
                </div>
            </div>
        </>
    )
}

export default PassesPage
