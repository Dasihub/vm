import React from 'react'
import { Button, Input, Loader, ModalWindow, SelectCustom } from '../../components'
import { valueType } from '../../components/SelectCustom/ISelect'
import { useHttp } from '../../hooks/useHttp'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { IStudentsDetails } from '../../ui/SearchStudent/ISearchStudent'
import { ISemester } from '../../ui/MainPage/Dekanat/IDekanat'
import { generateEntryPdf } from '../../services/pdf/receipt'
import { isScreen } from '../../config/data'
import styles from './styles.module.scss'

const PassesPage: React.FC = () => {
    const { request } = useHttp()
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { id_user, id_role, id_avn_user } = useTypeSelector(state => state.authReducer)
    const { id_group, name, surname } = useTypeSelector(state => state.userInfoReducer)
    const [semester, setSemester] = React.useState<ISemester[]>([])
    const { ws, isLoaderWs } = useTypeSelector(state => state.wsReducer)
    const [valueYear, setValueYear] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [valueWs, setValueWs] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [valueSemester, setValueSemester] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [isLoader, setIsLoader] = React.useState<ILoader>({
        semester: false,
        journal: false
    })
    const [journalDetails, setJournalDetails] = React.useState<IStudentsDetails[]>([])
    const [chooseJournal, setChooseJournal] = React.useState<IStudentsDetails[]>([])
    const [isModal, setIsModal] = React.useState<boolean>(false)
    const [noData, setNoData] = React.useState<boolean>(false)

    const choose = (e: React.ChangeEvent<HTMLInputElement>, j: IStudentsDetails) => {
        if (e.target.checked) {
            return setChooseJournal(pre => (pre = [...pre, j]))
        }
        setChooseJournal(pre => (pre = pre.filter(item => item.id !== j.id)))
    }

    const changeYear = (v: valueType) => {
        setValueYear(v)
        setValueWs({ value: null, label: '' })
        if (valueSemester.value) {
            setValueSemester({ value: null, label: '' })
        }

        if (journalDetails.length) {
            setJournalDetails([])
        }
    }

    const changeWs = (v: valueType) => {
        setValueWs(v)
        if (valueSemester.value) {
            setValueSemester({ value: null, label: '' })
        }
        getSemester(v.value)

        if (journalDetails.length) {
            setJournalDetails([])
        }
    }

    const changeSemester = (v: valueType) => {
        setValueSemester(v)
        getJournal(v.value)
    }

    const getJournal = async (id_semester: string | number | null) => {
        if (noData) {
            setNoData(false)
        }

        if (journalDetails.length) {
            setJournalDetails([])
        }

        setIsLoader({ ...isLoader, journal: true })
        const { data } = await request(
            `/teacher/search-student-detail?id_year=${valueYear.value}&id_ws=${valueWs.value}&id_role=${id_role}&id_avn_user=${id_avn_user}&id_user=${id_user}&id_group=${id_group}&id_student=${id_user}&id_semester=${id_semester}`
        )
        setIsLoader({ ...isLoader, journal: false })
        if (data.length) {
            return setJournalDetails(data)
        }
        setNoData(true)
    }

    const getSemester = async (ws_: number | null | string) => {
        setIsLoader({ ...isLoader, semester: true })
        const { data } = await request(
            `/student/passes/semester?id_ws=${ws_}&id_group=${id_group}&id_student=${id_user}`
        )
        setIsLoader({ ...isLoader, semester: false })
        setSemester(data)
    }

    const postReceipt = async () => {
        const f = chooseJournal.map(item => item.id)
        await request('/student/receipt', 'POST', {
            ids: f,
            id_role,
            id_user,
            cipher: chooseJournal[0].shifr
        })
        getJournal(valueSemester.value)
        setChooseJournal([])
    }

    const showModal = () => {
        document.body.style.overflowY = 'hidden'
        setIsModal(true)
    }

    const hideModal = () => {
        document.body.style.overflowY = 'visible'
        setIsModal(false)
    }

    const confirm = () => {
        generateEntryPdf(chooseJournal, name, surname)
        document.body.style.overflowY = 'visible'
        setIsModal(false)
        postReceipt()
    }

    React.useEffect(() => {
        if (years.length) {
            // @ts-ignore
            const { id_a_year, p32 } = years.find(item => item.defaultValue == 1)
            setValueYear({ label: p32, value: id_a_year })
        }
    }, [years])

    React.useEffect(() => {
        if (ws.length) {
            // @ts-ignore
            const { id_ws, ws: a } = ws.find(item => item.defaultValue == 1)
            setValueWs({ value: id_ws, label: a })
            getSemester(id_ws)
        }
    }, [ws])

    return (
        <>
            {isModal && (
                <ModalWindow title="Выбранные дисциплины" hide={hideModal}>
                    <>
                        <h4 className="flex justify-content-between">
                            <div style={{ width: '100%', textAlign: 'right' }}>Шифр: {chooseJournal[0].shifr}</div>
                            <div style={{ width: '100%', textAlign: 'right' }}>
                                Сумма:{' '}
                                {chooseJournal.reduce((a, b) => {
                                    return a + b.price
                                }, 0)}{' '}
                                сом
                            </div>
                        </h4>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className="text-center">№</th>
                                    <th className="text-center">Дисциплина</th>
                                    <th className="text-center">Вид занятие</th>
                                    <th className="text-center">Преподаватель</th>
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
                                        <td className="text-center">{item.t_fio}</td>
                                        <td className="text-center">{item.visitDate}</td>
                                        <td className="text-center">{item.otsenka}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex justify-content-end mt-2">
                            <Button value="Сохранить" onClick={confirm} />
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
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Семестр"
                            label="Семестр"
                            value={valueSemester.value ? valueSemester : ''}
                            options={
                                valueWs.value
                                    ? semester.map(item => ({
                                          value: item.id_semester,
                                          label: item.semester
                                      }))
                                    : []
                            }
                            onChange={changeSemester}
                            loader={isLoader.semester}
                            isDisabled={!valueWs.value}
                        />
                    </div>
                </div>
            </div>
            <div style={{ minHeight: '200px' }} className={isScreen ? 'box_container w-100 mt-2' : 'mt-2'}>
                {isLoader.journal && (
                    <div className="flex justify-content-center mt-2">
                        <Loader />
                    </div>
                )}
                {journalDetails.length ? (
                    <div className="flex justify-content-between">
                        <h3>
                            <span style={{ fontWeight: '400', marginRight: '5px' }}>Цена за один пропуск: </span>
                            {journalDetails[0].priceDefault} сом
                        </h3>

                        <h3>
                            <span style={{ fontWeight: '400', marginRight: '5px' }}>Шифр: </span>
                            {journalDetails[0].shifr}
                        </h3>
                    </div>
                ) : null}
                {noData && <p className="text-center mt-2">Данные не найдены!</p>}
                {isScreen ? (
                    <div style={{ height: '64vh', overflowY: 'auto' }}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className="text-center">№</th>
                                    <th className="text-center">Дисциплина</th>
                                    <th className="text-center">Вид занятие</th>
                                    <th className="text-center">Преподаватель</th>
                                    <th className="text-center">Дата</th>
                                    <th className="text-center">Оценка</th>
                                    <th className="text-center">Тип отработки</th>
                                    <th className="text-center">Оплачено</th>
                                    <th className="text-center">Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {journalDetails.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{item.discipline}</td>
                                        <td className="text-center">{item.short_name}</td>
                                        <td className="text-center">{item.t_fio}</td>
                                        <td className="text-center">{item.visitDate}</td>
                                        <td className="text-center">{item.otsenka}</td>
                                        <td className="text-center">{item.working_off}</td>
                                        <td className="text-center">{item.paymentStatus}</td>
                                        <td className="text-center">
                                            {!!item.statusUpd && (
                                                <Input
                                                    onChange={e => choose(e, item)}
                                                    value={String(item.id)}
                                                    type="checkbox"
                                                    style={{
                                                        width: '16px',
                                                        height: '16px',
                                                        cursor: 'pointer',
                                                        accentColor: '#49D399'
                                                    }}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    journalDetails.map((item, index) => (
                        <div className={styles.card}>
                            <p className="color-dark">{item.visitDate}</p>
                            <div className="flex justify-content-between mt-1 gap-1">
                                <div className="color-primary">Дисциплина</div>
                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>{item.discipline}</div>
                            </div>
                            <div className="flex justify-content-between mt-1">
                                <div className="color-primary">Вид занятие</div>
                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>{item.short_name}</div>
                            </div>
                            <div className="flex justify-content-between mt-1 gap-1">
                                <div className="color-primary">Преподаватель</div>
                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>{item.t_fio}</div>
                            </div>
                            <div className="flex justify-content-between mt-1 gap-1">
                                <div className="color-primary">Дата</div>
                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>{item.visitDate}</div>
                            </div>
                            <div className="flex justify-content-between mt-1 gap-1">
                                <div className="color-primary">Оценка</div>
                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>{item.otsenka}</div>
                            </div>
                            <div className="flex justify-content-between mt-1 gap-1">
                                <div className="color-primary">Тип отработки</div>
                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>{item.working_off}</div>
                            </div>
                            <div className="flex justify-content-between mt-1 gap-1">
                                <div className="color-primary">Оплачено</div>
                                <div style={{ color: '#64748B', fontWeight: 'bold' }}>{item.paymentStatus}</div>
                            </div>
                            <div className="flex justify-content-between mt-1 gap-1">
                                <div className="color-primary">Действие</div>
                                {!!item.statusUpd && (
                                    <Input
                                        onChange={e => choose(e, item)}
                                        value={String(item.id)}
                                        type="checkbox"
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            cursor: 'pointer',
                                            accentColor: '#49D399'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ))
                )}
                <div className={isScreen ? 'flex justify-content-end' : styles.btn}>
                    <Button value="Сформировать" disabled={!chooseJournal.length} onClick={showModal} />
                </div>
            </div>
        </>
    )
}

export default PassesPage
