import React from 'react'
import { valueType } from '../../../components/SelectCustom/ISelect'
import { SelectCustom } from '../../../components'
import { subGroupFor } from '../../../config/data'
import { IRenderSubGroupProps } from './IRenderSubGroup'

const RenderSubGroup: React.FC<IRenderSubGroupProps> = ({ index, postSubGroupStudent, item }) => {
    const [value, setValue] = React.useState<valueType>({
        value: null,
        label: ''
    })
    const [student, setStudent] = React.useState<{ id_student: null | number; id_studentJournalVisit_subgroup: null | number }>({
        id_student: null,
        id_studentJournalVisit_subgroup: null
    })

    const changeSub = (v: valueType) => {
        postSubGroupStudent(student?.id_student, v.value, student?.id_studentJournalVisit_subgroup)
        setValue(v)
    }

    React.useEffect(() => {
        setValue({
            value: item.subgroup,
            label: item.subgroup ? `${item.subgroup} - Подгруппа` : ''
        })
    }, [item])

    return (
        <tr>
            <td className="text-center">{index + 1}</td>
            <td style={{ paddingLeft: '10px' }}>{item.s_fio}</td>
            <td className="text-center p-l-r-1">
                <SelectCustom
                    value={value.value ? value : ''}
                    onFocus={setStudent.bind(null, {
                        id_studentJournalVisit_subgroup: item.id_studentJournalVisit_subgroup,
                        id_student: item.id_student
                    })}
                    placeholder="--"
                    options={subGroupFor}
                    onChange={changeSub}
                />
            </td>
        </tr>
    )
}

export default RenderSubGroup
