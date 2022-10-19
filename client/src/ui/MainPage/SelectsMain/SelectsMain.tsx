import React from 'react'
import { Input, SelectCustom } from '../../../components'
import { ISelectsMainIProps } from './ISelectsMain'
import { useTypeSelector } from '../../../hooks/useTypeSelector'

const SelectsMain: React.FC<ISelectsMainIProps> = ({
    valueSelects,
    semester,
    faculties,
    changeSemester,
    changeYear,
    changeWs,
    changeFaculties,
    isLoader,
    feduc,
    groups,
    direction,
    vidZanyatie,
    specialities,
    changeSpeciality,
    changeFeduc,
    changeVidZanyatie,
    changeGroup,
    changeDirection
}) => {
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { ws, isLoaderWs } = useTypeSelector(state => state.wsReducer)

    return (
        <>
            <div className="flex justify-content-between gap-2">
                <div className="w-100">
                    <SelectCustom
                        placeholder="Учебный год"
                        label="Учебный год"
                        value={valueSelects.v_year}
                        options={years.map(item => ({ value: item.id_a_year, label: item.p32 }))}
                        onChange={changeYear}
                        loader={isLoaderYear}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Полугодие"
                        label="Полугодие"
                        value={valueSelects.v_ws.value ? valueSelects.v_ws : ''}
                        options={valueSelects.v_year.value ? ws.map(item => ({ value: item.id_ws, label: item.ws })) : []}
                        onChange={changeWs}
                        loader={isLoaderWs}
                        isDisabled={!valueSelects.v_year.value}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Семестр"
                        label="Семестр"
                        value={valueSelects.v_semester.value ? valueSelects.v_semester : ''}
                        options={valueSelects.v_ws.value ? semester.map(item => ({ value: item.id_semester, label: item.semester })) : []}
                        onChange={changeSemester}
                        loader={isLoader.semester}
                        isDisabled={!valueSelects.v_ws.value}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Факультет"
                        label="Факультет"
                        value={valueSelects.v_faculty.value ? valueSelects.v_faculty : ''}
                        options={valueSelects.v_semester.value ? faculties.map(item => ({ value: item.id_faculty, label: item.faculty })) : []}
                        onChange={changeFaculties}
                        loader={isLoader.faculty}
                        isDisabled={!valueSelects.v_semester.value}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Форма обучение"
                        label="Форма обучение"
                        value={valueSelects.v_feduc.value ? valueSelects.v_feduc : ''}
                        options={valueSelects.v_faculty.value ? feduc.map(item => ({ value: item.id_f_educ, label: item.f_educ })) : []}
                        onChange={changeFeduc}
                        loader={isLoader.feduc}
                        isDisabled={!valueSelects.v_faculty.value}
                    />
                </div>
            </div>
            <div className="flex justify-content-between gap-2 mt-2">
                <div className="w-100">
                    <SelectCustom
                        placeholder="Направление"
                        label="Направление"
                        value={valueSelects.v_direction.value ? valueSelects.v_direction : ''}
                        options={valueSelects.v_feduc.value ? direction.map(item => ({ value: item.id_direction, label: item.direction })) : []}
                        onChange={changeDirection}
                        loader={isLoader.direction}
                        isDisabled={!valueSelects.v_feduc.value}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Специальность"
                        label="Специальность"
                        value={valueSelects.v_speciality.value ? valueSelects.v_speciality : ''}
                        options={valueSelects.v_direction.value ? specialities.map(item => ({ value: item.id_speciality, label: item.special })) : []}
                        onChange={changeSpeciality}
                        loader={isLoader.speciality}
                        isDisabled={!valueSelects.v_direction.value}
                    />
                </div>
            </div>
            <div className="flex justify-content-between gap-2 mt-2">
                <div className="w-100">
                    <SelectCustom
                        placeholder="Группа"
                        label="Группа"
                        value={valueSelects.v_group.value ? valueSelects.v_group : ''}
                        options={valueSelects.v_speciality.value ? groups.map(item => ({ value: item.id_group, label: item.p20 })) : []}
                        onChange={changeGroup}
                        loader={isLoader.group}
                        isDisabled={!valueSelects.v_speciality.value}
                    />
                </div>
                <div className="w-100">
                    <SelectCustom
                        placeholder="Вид занятие"
                        label="Вид занятие"
                        value={valueSelects.v_vid_zanyatie.value ? valueSelects.v_vid_zanyatie : ''}
                        options={
                            valueSelects.v_group.value ? vidZanyatie.map(item => ({ value: item.id_vid_zaniatiy, label: item.vid_zaniatiy })) : []
                        }
                        onChange={changeVidZanyatie}
                        loader={isLoader.vid_zanyatie}
                        isDisabled={!valueSelects.v_group.value}
                    />
                </div>
            </div>
        </>
    )
}

export default SelectsMain
