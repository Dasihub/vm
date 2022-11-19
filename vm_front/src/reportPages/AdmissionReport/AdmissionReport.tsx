import React from 'react'
import { useReactToPrint } from 'react-to-print'
import { useHttp } from '../../hooks/useHttp'
import { Loader } from '../../components'
import { IAdmission, IAdmissionReportProps } from './IAdmission'
import styles from './styles.module.scss'
import { Print } from '../../img'

const AdmissionReport: React.FC<IAdmissionReportProps> = ({ id, back }) => {
    const { request, loader } = useHttp()
    const [admission, setAdmission] = React.useState<IAdmission>()
    const ref = React.useRef<HTMLDivElement | null>(null)

    const getReport = async () => {
        const { data } = await request(`/reports/admission/${id}`)
        setAdmission(data)
    }

    React.useEffect(() => {
        getReport()
        document.body.style.overflowY = 'visible'
    }, [])

    const print = useReactToPrint({
        content: () => ref.current
    })

    if (loader) {
        return (
            <div className="flex justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <div className={styles.print}>
                <i
                    className="fa-solid fa-arrow-left-long color-primary"
                    onClick={back}
                    style={{ cursor: 'pointer', fontSize: '30px' }}
                />
                <img onClick={print} src={Print} alt="print" />
            </div>
            <div className={styles.a4} ref={ref}>
                <div style={{ padding: '30px 0 0 70px', fontWeight: 'bold' }}>
                    <span style={{ fontWeight: '500' }}>Шифр</span>: {admission?.shifr}
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <div className="text-center flex gap-1 justify-content-center">
                        <h2>ДОПУСК №</h2> <div className={styles.br} style={{ width: '50px' }} />
                    </div>
                    <h2 className="text-center">на платную обработку</h2>
                </div>
                {/*<h1 className="p-3 text-center flex gap-1 justify-content-center">*/}
                {/*    ДОПУСК №<div className={styles.br} style={{ width: '50px' }} />*/}
                {/*</h1>*/}
                {/*<h3 className="text-center">на платную обработку</h3>*/}
                <div className={styles.title}>
                    <span style={{ fontWeight: '500' }}>по дисциплине:</span> {admission?.discipline}
                </div>
                <div className={styles.title}>
                    <span style={{ fontWeight: '500' }}>Ф.И.О студента:</span> {admission?.s_fio}
                </div>
                <div className={styles.title}></div>
                <div className={styles.title}>
                    <span style={{ fontWeight: '500' }}>Год:</span> {admission?.years}г{' '}
                    <span style={{ fontWeight: '500' }}>Факультет:</span> {admission?.faculty}{' '}
                    <span style={{ fontWeight: '500' }}>Курс:</span> {admission?.rate}{' '}
                    <span style={{ fontWeight: '500' }}>Группа:</span> {admission?.groups}
                </div>
                <div className={styles.title}>
                    <span style={{ fontWeight: '500' }}>Дата пропуска:</span> {admission?.visitDate}
                </div>
                <div className={styles.title}>
                    <span style={{ fontWeight: '500' }}>Срок ликвидации задолженности:</span> {admission?.endDate}г
                </div>
                <div className={styles.title}>
                    <span style={{ fontWeight: '500' }}>Декан:</span>
                    <div className="flex gap-1">
                        <div>{admission?.n_director}</div> <div className={styles.br} />
                    </div>
                </div>
                <div className={styles.title}>{admission?.datePrint}</div>
            </div>
        </>
    )
}

export default AdmissionReport
