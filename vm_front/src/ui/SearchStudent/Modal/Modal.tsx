import React from 'react'
import { Button, Input, ModalWindow, SelectCustom, TextArea } from '../../../components'
import { IModalProps, IValueModalInput, IValueSelects } from './IModal'
import { valueType } from '../../../components/SelectCustom/ISelect'

const Modal: React.FC<IModalProps> = ({ hideModal, grade, working, idWorking, idOtsenka, updateJournal, status }) => {
    const [valueSelects, setValueSelects] = React.useState<IValueSelects>({
        v_working: { value: null, label: '' },
        v_otsenka: { value: null, label: '' }
    })
    const [valueModalInput, setValueModalInput] = React.useState<IValueModalInput>({
        cipher: '',
        description: ''
    })

    const click = () => {
        const { v_working, v_otsenka } = valueSelects
        const { cipher, description } = valueModalInput
        updateJournal(cipher, description, v_otsenka.value, v_working.value)
    }

    const changeModalInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueModalInput((pre: IValueModalInput) => (pre = { ...pre, [e.target.name]: e.target.value }))
    }

    const changeWorking = (v: valueType) => setValueSelects(pre => (pre = { ...pre, v_working: v }))
    const changeOtsenka = (v: valueType) => setValueSelects(pre => (pre = { ...pre, v_otsenka: v }))

    React.useEffect(() => {
        // @ts-ignore
        const { id_T_StudentJournalVisit_working_off, working_off_name } = working.find(
            item => item.id_T_StudentJournalVisit_working_off == idWorking
        )
        // @ts-ignore
        const { id_otsenka, otsenka } = grade.find(item => item.id_otsenka == idOtsenka)
        setValueSelects({
            v_working: { value: id_T_StudentJournalVisit_working_off, label: working_off_name },
            v_otsenka: { value: id_otsenka, label: otsenka }
        })
    }, [])

    const { v_working, v_otsenka } = valueSelects

    return (
        <ModalWindow title="Деканат" hide={hideModal}>
            <>
                <div>
                    Оплачено: <span style={{ fontWeight: 'bold' }}>{status}</span>
                </div>

                <div className="w-100 mt-2">
                    <SelectCustom
                        placeholder="Тип отработки"
                        label="Тип отработки"
                        value={v_working.value ? v_working : ''}
                        options={working.map(item => ({
                            value: item.id_T_StudentJournalVisit_working_off,
                            label: item.working_off_name
                        }))}
                        onChange={changeWorking}
                    />
                </div>
                <div className="w-100 mt-2">
                    <SelectCustom
                        placeholder="Допуск"
                        label="Допуск"
                        value={v_otsenka.value || v_otsenka.value == 0 ? v_otsenka : ''}
                        onChange={changeOtsenka}
                        options={grade.map(item => ({ value: item.id_otsenka, label: item.otsenka }))}
                    />
                </div>
                <div className="w-100 mt-2">
                    <Input
                        value={valueModalInput.cipher}
                        label="Шифр"
                        id="cipher"
                        type="number"
                        name="cipher"
                        onChange={changeModalInput}
                    />
                </div>
                <div className="w-100 mt-2">
                    <TextArea
                        value={valueModalInput.description}
                        onChange={changeModalInput}
                        name="description"
                        label="Описание"
                    />
                </div>
                <div className="mt-2 flex justify-content-end">
                    <Button value="Сохранить" onClick={click} disabled={!v_working.value || v_otsenka.value == null} />
                </div>
            </>
        </ModalWindow>
    )
}

export default Modal
