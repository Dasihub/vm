import React from 'react'
import styles from './styles.module.scss'
import { Button, Input, SelectCustom } from '../../../../components'
import { useTypeSelector } from '../../../../hooks/useTypeSelector'
import { ILoader, IValueSelects } from './ISearchStudent'
import { valueType } from '../../../../components/SelectCustom/ISelect'
import { useHttp } from '../../../../hooks/useHttp'
import { ISemester } from '../Dekanat/IDekanat'

const SearchStudent: React.FC = () => {
    const { request } = useHttp()
    const { years, isLoaderYear } = useTypeSelector(state => state.yearReducer)
    const { ws, isLoaderWs } = useTypeSelector(state => state.wsReducer)
    const [value, setValue] = React.useState<string>('')
    const [semester, setSemester] = React.useState<ISemester[]>([])
    const [valueSelects, setValueSelects] = React.useState<IValueSelects>({
        v_year: { value: null, label: '' },
        v_ws: { value: null, label: '' },
        v_semester: { value: null, label: '' }
    })
    const [isLoader, setIsLoader] = React.useState<ILoader>({
        semester: false
    })

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const searchAPI = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const changeYear = (v: valueType) => {
        setValueSelects({ v_year: v, v_ws: { value: null, label: '' }, v_semester: { value: null, label: '' } })
    }

    const changeWs = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_ws: v, v_semester: { value: null, label: '' } })
        getSemester(v.value)
    }

    const getSemester = async (ws: number | null | string) => {
        setIsLoader({ ...isLoader, semester: true })
        const { data } = await request(`/selectors/semester/${ws}`)
        setIsLoader({ ...isLoader, semester: false })
        setSemester(data)
    }

    const changeSemester = (v: valueType) => {
        setValueSelects({ ...valueSelects, v_semester: v })
    }

    return (
        <>
            <div className="box_container">
                <h2 className="text-center ">Поиск студентов</h2>

                <div className={`${styles.container} mt-2`}>
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
                            options={
                                valueSelects.v_year.value
                                    ? ws.map(item => ({
                                          value: item.id_ws,
                                          label: item.ws
                                      }))
                                    : []
                            }
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
                            options={
                                semester.length
                                    ? semester.map(item => ({
                                          value: item.id_semester,
                                          label: item.semester
                                      }))
                                    : []
                            }
                            onChange={changeSemester}
                            loader={isLoader.semester}
                            isDisabled={!valueSelects.v_ws.value}
                        />
                    </div>
                </div>
                <form>
                    <div className="flex justify-content-center gap-2 align-items-center mt-2">
                        <Input value={value} onChange={change} />
                        <Button onClick={searchAPI} value="Поиск" />
                    </div>
                </form>
            </div>

            <div className="flex justify-content-between mt-2 gap-2">
                <div style={{ height: '200px' }} className="box_container w-100"></div>

                <div style={{ height: '200px' }} className="box_container w-100"></div>
            </div>
        </>
    )
}

export default SearchStudent
