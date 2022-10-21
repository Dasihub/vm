import React from 'react'
import dayjs from 'dayjs'
import { IJournalStudentProps } from './IJournalStudent'
import styles from './styles.module.scss'

const JournalStudent: React.FC<IJournalStudentProps> = ({ visitDateGrouped, data, dataMax }) => {
    return (
        <div className="overflow-auto mt-4" style={{ maxHeight: '900px', minHeight: '400px' }}>
            <table className={styles.table}>
                <thead className="bg-light">
                    <tr>
                        <th className="th" rowSpan={2} style={{ width: '50px' }}>
                            №
                        </th>
                        <th className="th" rowSpan={2}>
                            Вид занятие
                        </th>
                        <th className="th" colSpan={Object.keys(visitDateGrouped).length}>
                            Дата
                        </th>
                    </tr>
                    <tr>
                        {Object.keys(visitDateGrouped).map((item, index) => (
                            <th className="th" key={index}>
                                {dayjs(item).format('DD-MM-YYYY')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((itemData, index) => (
                        <>
                            <tr key={index}>
                                <td className="text-center" rowSpan={dataMax[itemData]}>
                                    {index + 1}
                                </td>
                                <td className="text-center" rowSpan={dataMax[itemData]}>
                                    {itemData}
                                </td>
                                {Object.keys(visitDateGrouped).map((itemVisitDate, indexVisitDate) => {
                                    return (
                                        <td rowSpan={dataMax[itemData]}>
                                            {Array.from(Array(dataMax[itemData]).keys()).map((itemTimesCount, indexTimesCount) => {
                                                if (!!data[itemData][itemVisitDate]) {
                                                    return (
                                                        <div className="text-center">
                                                            {data[itemData][itemVisitDate][indexTimesCount + 1]?.length &&
                                                            data[itemData][itemVisitDate][indexTimesCount + 1][0]?.timesCount
                                                                ? data[itemData][itemVisitDate][indexTimesCount + 1][0]?.otsenka || ' присут '
                                                                : '--'}
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className="text-center">
                                                            {/*{indexTimesCount == 0 && (*/}
                                                            {/*    <td style={{ visibility: 'hidden' }} rowSpan={dataMax[itemData]}>*/}
                                                            {/*        nodeata*/}
                                                            {/*    </td>*/}
                                                            {/*)}*/}
                                                            <i style={{ fontSize: '20px' }} className="fa-solid fa-xmark" />
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </td>
                                    )
                                })}
                            </tr>
                            {Array.from(Array(dataMax[itemData] - 1).keys()).map((item, indexMax) => {
                                return <tr key={indexMax} style={{ visibility: 'hidden' }}></tr>
                            })}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default JournalStudent
