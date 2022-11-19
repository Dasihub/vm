import React from 'react'
import { Alert, Loader, SelectCustom } from '../../components'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { valueType } from '../../components/SelectCustom/ISelect'
import styles from './styles.module.scss'
import { useHttp } from '../../hooks/useHttp'
import { IPayment } from './IPayment'
import { useGroupBy } from '../../hooks/useGroupBy'
import { Trash } from '../../icons'
import { useMessage } from '../../hooks/useMessage'
import { IRes } from '../../models/IModels'

const Payment: React.FC = () => {
    const { request, loader } = useHttp()
    const toast = useMessage()
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { id_role, id_user } = useTypeSelector(state => state.authReducer)
    const [isAlert, setIsAlert] = React.useState<boolean>(false)
    const [payment, setPayment] = React.useState<IPayment[]>([])
    const [valueYear, setValueYear] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [noData, setNoData] = React.useState<boolean>(false)
    const [id, setId] = React.useState<null | number>(null)

    const changeYear = (v: valueType) => {
        setValueYear(v)
        getPayment(v.value)
    }

    const getPayment = async (year: string | number | null) => {
        if (noData) {
            setNoData(false)
        }

        if (payment.length) {
            setPayment([])
        }

        const { data } = await request(`/student/payment?id_year=${year}&id_role=${id_role}&id_user=${id_user}`)

        if (data.length) {
            return setPayment(data)
        }
        setNoData(true)
    }

    const deletePayment = async () => {
        setIsAlert(false)
        const { message, type }: IRes = await request(`/student/payment/${id}/${id_role}/${id_user}`, 'DELETE')
        getPayment(valueYear.value)
        toast(message, type)
    }

    const showAlert = (id: number) => {
        setId(id)
        setIsAlert(true)
    }

    const wsGrouped = useGroupBy(payment, 'w_s')

    React.useEffect(() => {
        if (years.length) {
            // @ts-ignore
            const { id_a_year, p32 } = years.find(item => item.defaultValue == 1)
            setValueYear({ label: p32, value: id_a_year })
            getPayment(id_a_year)
        }
    }, [years])

    return (
        <>
            {isAlert && <Alert hide={setIsAlert.bind(null, false)} confirm={deletePayment} />}
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
                </div>
            </div>
            <div style={{ minHeight: '60vh' }} className="box_container w-100 mt-2">
                {loader && (
                    <div className="flex justify-content-center mt-2">
                        <Loader />
                    </div>
                )}
                {noData && <p className="text-center mt-2">Пока нет данных!</p>}
                {payment.length ? (
                    <h3 className="flex justify-content-end">
                        <span style={{ fontWeight: '400', marginRight: '5px' }}>Шифр: </span> {payment[0]?.shifr}
                    </h3>
                ) : null}
                {Object.keys(wsGrouped).map((item, index) => (
                    <div key={item + index}>
                        {item.length ? (
                            <>
                                <h3 className="mt-2">{item}</h3>
                            </>
                        ) : null}
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
                                        <th className="text-center">Оплачено</th>
                                        <th className="text-center">Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wsGrouped[item].map((i: IPayment, index_2: number) => (
                                        <tr key={i.id}>
                                            <td className="text-center">{index_2 + 1}</td>
                                            <td className="text-center">{i.discipline}</td>
                                            <td className="text-center">{i.short_name}</td>
                                            <td className="text-center">{i.t_fio}</td>
                                            <td className="text-center">{i.visitDate}</td>
                                            <td className="text-center">{i.otsenka}</td>
                                            <td className="text-center">{i.paymentStatus}</td>
                                            <td className="text-center">
                                                {!!i.statusDel && (
                                                    <img
                                                        onClick={showAlert.bind(null, i.id)}
                                                        className="pointer"
                                                        src={Trash}
                                                        alt="trash"
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Payment
