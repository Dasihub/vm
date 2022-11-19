import React from 'react'
import { useReactToPrint } from 'react-to-print'
import { useHttp } from '../../hooks/useHttp'
import { Alert, Loader } from '../../components'
import { useTypeSelector } from '../../hooks/useTypeSelector'
import { IJournalReportProps, IReportJournal } from './IJournalReport'
import { Exel, Print } from '../../img'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { useGroupBy } from '../../hooks/useGroupBy'
import dayjs from 'dayjs'
import { useMessage } from '../../hooks/useMessage'

const JournalReport: React.FC<IJournalReportProps> = ({
    groups,
    vidZanyatie,
    idDiscipline,
    isSelect,
    discipline,
    credit,
    idGroup,
    idWs,
    idYear,
    idVidZanyatie,
    back
}) => {
    const { request } = useHttp()
    const toast = useMessage()
    const [report, setReport] = React.useState<any>([])
    const { id_user } = useTypeSelector(state => state.authReducer)
    const { years } = useTypeSelector(state => state.yearReducer)
    const { ws } = useTypeSelector(state => state.wsReducer)
    const { surname, name, patronymic } = useTypeSelector(state => state.userInfoReducer)
    const ref = React.useRef<HTMLDivElement | null>(null)
    const [journal, setJournal] = React.useState<IReportJournal[]>([])
    const [loader, setLoader] = React.useState<boolean>(false)
    const [noData, setNoData] = React.useState<boolean>(false)
    const [alert, setAlert] = React.useState<boolean>(false)
    const [oneDate, setOneDate] = React.useState<string>('')

    const journalGrouped = useGroupBy(journal, 'dates')

    const deleteGrade = async () => {
        setAlert(false)
        const { timesCount, id_discipline, id_semesterOrWs, id_vid_zaniatiy, credits, visitDate }: IReportJournal =
            journalGrouped[oneDate][0]
        const dateV = dayjs(visitDate).format('YYYY-MM-DD')
        const { data }: { data: { SMS_T_StudentJournalVisit_delete: string } } = await request(
            `/reports/journal/?id_teacher=${id_user}&id_discipline=${id_discipline}&credit=${credits}&visitDate=${dateV}&id_groupOrPorok=${idGroup}&id_year=${idYear}&id_ws=${idWs}&id_semesterOrWs=${id_semesterOrWs}&id_vid_zaniatiy=${id_vid_zaniatiy}&timesCount=${timesCount}`,
            'DELETE'
        )
        toast(data?.SMS_T_StudentJournalVisit_delete, 'success')
        getReport()
    }

    const getReport = async () => {
        setLoader(true)
        const { data } = await request(
            `/reports/journal?year=${idYear}&id_ws=${idWs}&discipline=${idDiscipline}&credit=${credit}&group=${idGroup}&id_teacher=${id_user}&id_vid_zaniatiy=${idVidZanyatie}&isSelect=${isSelect}`
        )
        // setReport(data);
        setLoader(false)
        if (!data.length) {
            return setNoData(true)
        }

        let resObject = data.reduce((a: any, b: any) => {
            a[b.s_fio] = a[b.s_fio] || []
            a[b.s_fio].push({
                date: b.dates,
                otsenka: b.otsenka,
                timesCount: b.timesCount
            })
            return a
        }, {})
        let names = Object.keys(resObject)
        let resArray = []

        // max occured item for dates
        let max = { item: 0, count: 0 }
        for (let i = 0; i < data.length; i++) {
            let arrOccurences = data.filter((item: any) => {
                return item.s_fio === data[i].s_fio
            }).length
            if (arrOccurences > max.count) {
                max = {
                    item: data[i],
                    count: data.filter((item: any) => {
                        return item.s_fio === data[i].s_fio
                    }).length
                }
            }
        }
        let { item, count } = max

        //table header
        let header_obj = { name: 'ФИО студента' }
        for (let k = 0; k < count; k++) {
            // @ts-ignore
            header_obj['date_' + k] = resObject[item.s_fio][k].date
        } // @ts-ignore
        header_obj['nb_Count'] = 'Всего н/б' // @ts-ignore
        header_obj['ball_Count'] = 'Общая сумма' // @ts-ignore
        header_obj['ball_average'] = 'Средняя оценка'
        resArray.push(header_obj)
        //table
        for (let i = 0; i < names.length; i++) {
            let obj = { name: names[i] } //[names[i] = "Surname name"

            let nbSum = 0,
                ballSum = 0,
                tempOtsenka = null
            // @ts-ignore
            resObject[item.s_fio].map((tempItem: any, tempIndex: any) => {
                tempOtsenka = resObject[names[i]].filter((resObjectItem: any) => {
                    return (
                        resObjectItem.date == tempItem.date && //дата
                        resObjectItem.timesCount == tempItem.timesCount //пара
                    )
                })[0] // @ts-ignore
                obj['date_' + tempIndex] = tempOtsenka ? tempOtsenka.otsenka : null //оценка
            })

            for (let j = 0; j < count; j++) {
                //resObject[names[i]]  =>  "Surname name" : [ { date, otsenka, timesCount }, {...}, {...} ]

                if (resObject[names[i]][j]) {
                    resObject[names[i]][j].otsenka == 'н/б'
                        ? (nbSum += 1)
                        : (ballSum +=
                              resObject[names[i]][j].otsenka == null ? 0 : parseInt(resObject[names[i]][j].otsenka))
                }
            }
            // @ts-ignore
            obj['nb_Count'] = nbSum // @ts-ignore
            obj['ball_Count'] = ballSum // @ts-ignore
            obj['ball_average'] = Math.round((100 * ballSum) / count) / 100
            resArray.push(obj)
            setJournal(data)
            setReport(resArray)
        }
    }

    const print = useReactToPrint({
        content: () => ref.current
    })

    const showAlert = (item: string) => {
        setOneDate(item)
        setAlert(true)
    }

    React.useEffect(() => {
        if (name.length) {
            getReport()
        }
    }, [name])

    const exportToCSV = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const fileExtension = '.xlsx'
        let a = [{ 0: [1, '22', 'sdfsggb'], 1: [1, '22', 'sdfsggb'], 2: [1, '22', 'sdfsggb'] }]

        const ws = XLSX.utils.json_to_sheet(report)
        console.log({ ws })
        // const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
        // const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // const data = new Blob([excelBuffer], { type: fileType });
        // FileSaver.saveAs(data, 'ЖУРНАЛ УЧЕТА ЗАНЯТИЙ' + fileExtension);
    }

    if (loader) {
        return (
            <div className="vh-100 flex justify-content-center align-items-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            {alert && <Alert hide={setAlert.bind(null, false)} confirm={deleteGrade} />}
            <div className="m-l-r-2 flex align-items-center gap-1">
                <i
                    className="fa-solid fa-arrow-left-long color-primary"
                    onClick={back}
                    style={{ cursor: 'pointer', fontSize: '30px' }}
                />
                {noData ? null : (
                    <>
                        <img onClick={exportToCSV} style={{ cursor: 'pointer', width: '40px' }} src={Exel} alt="exel" />
                        <img onClick={print} style={{ cursor: 'pointer', width: '40px' }} src={Print} alt="print" />
                    </>
                )}
            </div>
            <div className="print_container box_container mt-2" ref={ref}>
                <h1 className="head_title">ЖУРНАЛ УЧЕТА ЗАНЯТИЙ</h1>
                {noData ? (
                    <p className="text-center mt-4">Пока нет данных!</p>
                ) : (
                    <>
                        <div className="mt-3 m-l-r-2">
                            Преподаватель:{' '}
                            <strong>
                                {surname} {name} {patronymic}
                            </strong>
                        </div>
                        <div className="mt-1 m-l-r-2">
                            Учебный год:{' '}
                            <strong>{years.map(item => (item.id_a_year === idYear ? item.p32 : null))}</strong>
                        </div>
                        <div className="mt-1 m-l-r-2">
                            Полугодие/Семестр: <strong>{ws.map(item => (item.id_ws === idWs ? item.ws : null))}</strong>
                        </div>
                        <div className="mt-1 m-l-r-2">
                            Факультет/Группа:{' '}
                            <strong>{groups.map(item => (item.id_group === idGroup ? item.groups : null))}</strong>
                        </div>
                        <div className="mt-1 m-l-r-2">
                            Дисциплина: <strong>{discipline}</strong>
                        </div>
                        <div className="mt-1 m-l-r-2">
                            Вид занятий:{' '}
                            <strong>
                                {vidZanyatie.map(item =>
                                    item.id_vid_zaniatiy === idVidZanyatie ? item.name_vid_zaniatiy : null
                                )}
                            </strong>
                        </div>
                        <div className="mt-4 m-l-r-2 overflow-auto">
                            <table className="table">
                                <tbody>
                                    {report.map((item: any, index: number) => {
                                        let names = Object.keys(item)
                                        return (
                                            <>
                                                <tr key={index}>
                                                    {index ? (
                                                        <>
                                                            <td className="text-center">{index}</td>
                                                            {names.map((fieldNames, i) => (
                                                                <td
                                                                    key={i}
                                                                    style={
                                                                        fieldNames == 'name'
                                                                            ? { textAlign: 'left', paddingLeft: '10px' }
                                                                            : { textAlign: 'center' }
                                                                    }>
                                                                    {item[fieldNames] ? item[fieldNames] : '-'}
                                                                </td>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <th className="bg-color-primary">№</th>

                                                            {/* //delete button */}
                                                            {names.map((fieldNames: any, i: number) =>
                                                                fieldNames.includes('date_') ? (
                                                                    <th className="bg-color-primary" key={i}>
                                                                        {' '}
                                                                        <i
                                                                            onClick={showAlert.bind(
                                                                                null,
                                                                                item[fieldNames]
                                                                            )}
                                                                            style={{
                                                                                color: 'white',
                                                                                marginRight: '8px'
                                                                            }}
                                                                            className="fa fa-pencil pointer"
                                                                        />{' '}
                                                                        {item[fieldNames] ? item[fieldNames] : '-'}
                                                                    </th>
                                                                ) : (
                                                                    <th className="bg-color-primary" key={i}>
                                                                        {item[fieldNames] ? item[fieldNames] : '-'}
                                                                    </th>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </tr>
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default JournalReport
