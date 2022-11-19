import React from 'react'
import { Button, ModalWindow, SelectCustom } from '../../../components'
import { IModalProps } from './IModal'
import { valueType } from '../../../components/SelectCustom/ISelect'

const Modal: React.FC<IModalProps> = ({ hideModal, grade, idOtsenka, updateJournal, status, working }) => {
    const [valueSelects, setValueSelects] = React.useState<valueType>({
        value: null,
        label: ''
    })

    const click = () => {
        updateJournal(valueSelects.value)
    }

    const changeOtsenka = (v: valueType) => setValueSelects(v)

    React.useEffect(() => {
        // @ts-ignore
        const { id_otsenka, otsenka } = grade.find(item => item.id_otsenka == idOtsenka)
        setValueSelects({
            value: id_otsenka,
            label: otsenka
        })
    }, [])

    return (
        <ModalWindow title="Изменить" hide={hideModal} isScroll={false}>
            <>
                <div>
                    Тип отработки: <span style={{ fontWeight: 'bold' }}>{status}</span>
                </div>
                <div>
                    Оплачено: <span style={{ fontWeight: 'bold' }}>{working}</span>
                </div>
                <div className="w-100 mt-2">
                    <SelectCustom
                        placeholder="Допуск"
                        label="Оценка"
                        value={valueSelects.value || valueSelects.value == 0 ? valueSelects : ''}
                        onChange={changeOtsenka}
                        options={grade.map(item => ({ value: item.id_otsenka, label: item.otsenka }))}
                    />
                </div>
                <div className="mt-2 flex justify-content-end">
                    <Button value="Сохранить" onClick={click} disabled={!valueSelects.value == null} />
                </div>
            </>
        </ModalWindow>
    )
}

export default Modal
