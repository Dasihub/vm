import React from 'react'
import { SelectCustom } from '../../../components'
import { IStudentsListProps } from './IStudentsList'
import { valueType } from '../../../components/SelectCustom/ISelect'

const StudentsList: React.FC<IStudentsListProps> = ({ index, item, setStudent, grade, updateOtsenkaApi }) => {
    const [valueOtsenko, setValueOtsenko] = React.useState<valueType>({
        value: null,
        label: ''
    })

    React.useEffect(() => {
        if (item.id_student) {
            if (grade.length) {
                // @ts-ignore
                const a = grade.find(i => i.id_otsenka == item.id_otsenka)
                setValueOtsenko({
                    value: a?.id_otsenka ? a?.id_otsenka : null,
                    label: a?.id_otsenka ? a?.otsenka : ''
                })
            }
        }
    }, [item])

    const changeGrade = (v: valueType) => {
        setValueOtsenko(v)
        updateOtsenkaApi(v)
    }

    return (
        <tr>
            <td className="text-center">{index + 1}</td>
            <td style={{ paddingLeft: '10px' }}>{item.s_fio}</td>
            <td style={{ width: '150px' }} className="text-center p-l-r-1" title="Выберите оценку">
                <SelectCustom
                    value={valueOtsenko.value ? valueOtsenko : ''}
                    onFocus={setStudent.bind(null, item)}
                    isDisabled={!item.status_upd}
                    placeholder="---"
                    options={
                        item.status_upd
                            ? grade?.map(i => ({
                                  value: i.id_otsenka,
                                  label: i.otsenka
                              }))
                            : []
                    }
                    onChange={changeGrade}
                />
            </td>
        </tr>
    )
}

export default StudentsList
