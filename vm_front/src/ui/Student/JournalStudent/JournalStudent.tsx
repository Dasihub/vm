import React from 'react'
import dayjs from 'dayjs'
import { IJournalStudentProps } from './IJournalStudent'
import styles from './styles.module.scss'

const JournalStudent: React.FC<IJournalStudentProps> = ({ visitDateGrouped, data, dataMax }) => {
    return (
        <div className="overflow-auto mt-4 box_container" style={{ maxHeight: '900px', minHeight: '400px' }}>
            <table className={styles.table}>
                <thead className="bg-light">
                    <tr>
                        <th rowSpan={2} style={{ width: '50px' }}>
                            №
                        </th>
                        <th rowSpan={2}>Дата</th>
                        <th colSpan={Object.keys(visitDateGrouped).length}>Вид занятие</th>
                    </tr>
                    <tr>
                        {Object.keys(visitDateGrouped).map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((itemData, index) => (
                        <>
                            <tr key={index}>
                                <td className={styles.td} style={{ textAlign: 'center' }} rowSpan={dataMax[itemData]}>
                                    {index + 1}
                                </td>
                                <td
                                    className={styles.td}
                                    style={{ textAlign: 'center', width: '200px' }}
                                    rowSpan={dataMax[itemData]}
                                >
                                    {dayjs(itemData).format('DD-MM-YYYY')}
                                </td>
                                {Object.keys(visitDateGrouped).map((itemVisitDate, indexVisitDate) => {
                                    return (
                                        <td
                                            className={!!data[itemData][itemVisitDate] ? styles.td : styles.td_non}
                                            key={indexVisitDate}
                                            rowSpan={dataMax[itemData]}
                                        >
                                            {Array.from(Array(dataMax[itemData]).keys()).map(
                                                (itemTimesCount, indexTimesCount) => {
                                                    if (!!data[itemData][itemVisitDate]) {
                                                        return (
                                                            <div
                                                                key={indexTimesCount}
                                                                className={
                                                                    data[itemData][itemVisitDate][indexTimesCount + 1]
                                                                        ?.length &&
                                                                    data[itemData][itemVisitDate][
                                                                        indexTimesCount + 1
                                                                    ][0]?.timesCount
                                                                        ? data[itemData][itemVisitDate][
                                                                              indexTimesCount + 1
                                                                          ][0]?.otsenka || 'color-primary'
                                                                        : 'color-danger'
                                                                }
                                                            >
                                                                {data[itemData][itemVisitDate][indexTimesCount + 1]
                                                                    ?.length &&
                                                                data[itemData][itemVisitDate][indexTimesCount + 1][0]
                                                                    ?.timesCount
                                                                    ? data[itemData][itemVisitDate][
                                                                          indexTimesCount + 1
                                                                      ][0]?.otsenka || 'присут'
                                                                    : 'отсутст'}
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div
                                                                key={indexTimesCount}
                                                                style={{ height: '34px', backgroundColor: '#F9F9F9' }}
                                                                className="text-center"
                                                            >
                                                                {/*{indexTimesCount == 0 && (*/}
                                                                {/*    <td style={{ visibility: 'hidden' }} rowSpan={dataMax[itemData]}>*/}
                                                                {/*        nodeata*/}
                                                                {/*    </td>*/}
                                                                {/*)}*/}
                                                                {/*<i style={{ fontSize: '20px' }} className="fa-solid fa-xmark" />*/}
                                                            </div>
                                                        )
                                                    }
                                                }
                                            )}
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
