import React from 'react'
import { Button, Input, Loader, ModalWindow, SelectCustom } from '../../../components'
import { amount, subGroup, typeGroup } from '../../../config/data'
import RenderSubGroup from '../RenderSubGroup/RenderSubGroup'
import { ISelectsTeacherProps } from './ISelectsTeacher'
import styles from './styles.module.scss'

const SelectsTeacher: React.FC<ISelectsTeacherProps> = ({
    discipline,
    valueSelects,
    semester,
    changeDate,
    changeYear,
    changeWs,
    changeDiscipline,
    changeGroup,
    changeSubGroup,
    changeTypeGroup,
    groups,
    disciplines,
    vidZanyatie,
    changeVidZanyatie,
    changeAmount,
    setStudent,
    loader,
    years,
    studentList,
    ws,
    isModal,
    showModal,
    hideModal,
    changeSemester,
    PostEveryoneWasPresent,
    setIsReport,
    subgroupStudents,
    postSubGroupStudent
}) => {
    const { v_year, v_semester, v_group, v_vid_zanyatie, v_ws, v_type_group, date, v_amount, v_sub_group } = valueSelects
    return (
        <>
            {isModal && (
                <ModalWindow title="Сформировать подгруппы" hide={hideModal}>
                    <>
                        {loader.modal && (
                            <div className="flex justify-content-center align-items-center">
                                <Loader />
                            </div>
                        )}
                        {subgroupStudents.length ? (
                            <table className="table">
                                <thead style={{ top: '0' }} className="bg-light">
                                    <tr style={{ backgroundColor: 'white', textAlign: 'center' }}>
                                        <th>№</th>
                                        <th>ФИО</th>
                                        <th style={{ width: '200px' }}>Подгруппа</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subgroupStudents.map((item, index) => (
                                        <RenderSubGroup key={item.id_student} item={item} index={index} postSubGroupStudent={postSubGroupStudent} />
                                    ))}
                                </tbody>
                            </table>
                        ) : null}
                    </>
                </ModalWindow>
            )}
            <div className="box_container">
                <h2 className="text-center ">Преподователь</h2>
                <div className={`${styles.container} mt-2`}>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Учебный год"
                            label="Учебный год"
                            value={v_year}
                            options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                            onChange={changeYear}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Полугодие"
                            label="Полугодие"
                            value={v_ws.value ? v_ws : ''}
                            options={ws.map(item => ({ value: item.id_ws, label: item.ws }))}
                            onChange={changeWs}
                            isDisabled={!v_year.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Дисциплина"
                            label="Дисциплина"
                            value={
                                discipline?.discipline
                                    ? {
                                          value: discipline.discipline,
                                          label: discipline.discipline
                                      }
                                    : ''
                            }
                            options={disciplines.map(item => ({ value: item.discipline, label: item.discipline }))}
                            loader={loader.discipline}
                            onChange={changeDiscipline}
                            isDisabled={!v_ws.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Семестр"
                            label="Семестр"
                            value={v_semester.value ? v_semester : ''}
                            options={semester.map(item => ({ value: item.id_semester, label: item.semester }))}
                            loader={loader.semester}
                            onChange={changeSemester}
                            isDisabled={!discipline?.discipline}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Группа"
                            label="Группа"
                            value={v_group.value ? v_group : ''}
                            options={groups.map(item => ({ value: item.id_group, label: item.groups }))}
                            loader={loader.group}
                            onChange={changeGroup}
                            isDisabled={!v_semester.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Вид занятие"
                            label="Вид занятие"
                            value={v_vid_zanyatie.value ? v_vid_zanyatie : ''}
                            options={vidZanyatie.map(item => ({
                                value: item.id_vid_zaniatiy,
                                label: item.name_vid_zaniatiy
                            }))}
                            loader={loader.vidZanyatie}
                            onChange={changeVidZanyatie}
                            isDisabled={!v_group.value}
                        />
                    </div>
                    <div className="w-100">
                        <SelectCustom
                            placeholder="Количество раз"
                            label="Количество раз"
                            value={v_amount.value ? v_amount : ''}
                            options={amount}
                            onChange={changeAmount}
                            isDisabled={!v_vid_zanyatie.value}
                        />
                    </div>
                    <div className="w-100">
                        <Input
                            label="Дата посещения"
                            value={date}
                            onChange={changeDate}
                            type="date"
                            min="00-00-0000"
                            max="2099-01-01"
                            readOnly={!v_amount.value}
                        />
                    </div>
                    {discipline?.isSelect === 0 ? (
                        <>
                            <div className="w-100">
                                <SelectCustom
                                    placeholder="Тип группы"
                                    label="Тип группы"
                                    value={v_type_group.value || v_type_group.value == 0 ? v_type_group : ''}
                                    options={typeGroup}
                                    loader={loader.group}
                                    onChange={changeTypeGroup}
                                    isDisabled={!date.length}
                                />
                            </div>
                            {v_type_group.value == 1 && (
                                <div className="w-100">
                                    <SelectCustom
                                        value={v_sub_group.value ? v_sub_group : ''}
                                        placeholder="Подгруппа"
                                        label="Подгруппа"
                                        options={subGroup}
                                        loader={loader.group}
                                        onChange={changeSubGroup}
                                        isDisabled={!v_type_group.value}
                                    />
                                </div>
                            )}
                        </>
                    ) : null}
                </div>
                <div className="mt-2 flex gap-2 flex-wrap">
                    {v_type_group.value == 1 && <Button onClick={showModal} value="Сформировать" disabled={!(v_type_group.value == 1)} />}
                    <Button onClick={PostEveryoneWasPresent} value="Все присутствовали" disabled={!studentList.length} />
                    <Button value="Отчет журнала" disabled={!studentList.length} onClick={setIsReport.bind(null, true)} />
                </div>
            </div>
        </>
    )
}

export default React.memo(SelectsTeacher)
