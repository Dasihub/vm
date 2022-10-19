import React from 'react'
import { Button, FileComponent, Input, ModalWindow, SelectCustom } from '../../../components'
import { useTypeSelector } from '../../../hooks/useTypeSelector'
import { IModalJurnalProps, IValues } from './IModalJurnal'
import { valueType } from '../../../components/SelectCustom/ISelect'

const ModalJurnal: React.FC<IModalJurnalProps> = ({ hideModal }) => {
    const { dopusk, dopuskDetal, vidDopusk } = useTypeSelector(state => state.jurnalReducer)

    const [values, setValues] = React.useState<IValues>({
        dopusk: { value: null, label: '' },
        dopuskDetal: { value: null, label: '' },
        vidDopusk: { value: null, label: '' },
        cipher: '',
        date: '',
        file: null
    })

    const changeDopusk = (v: valueType) => {
        setValues({ ...values, dopusk: v })
    }

    const changeDopuskDetal = (v: valueType) => {
        setValues({ ...values, dopuskDetal: v })
    }

    const changeVidDopusk = (v: valueType) => {
        setValues({ ...values, vidDopusk: v })
    }

    const changeCipherAndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setValues({ ...values, file: e.target.files })
        console.log(e.target.files)
    }

    return (
        <ModalWindow title="Журнал" hide={hideModal}>
            <form>
                <div className="mt-2">
                    <SelectCustom
                        options={dopusk.map(item => ({
                            value: item.id_studentJournalVisit_typeDopusk,
                            label: item.vidDopusk
                        }))}
                        onChange={changeDopusk}
                        label="Тип. допуска"
                        placeholder="Тип. допуска"
                    />
                </div>
                <div className="mt-2">
                    <SelectCustom
                        options={dopuskDetal.map(item => ({
                            value: item.id_studentJournalVisit_typeDopusk_detal,
                            label: item.typeDopusk_detal
                        }))}
                        onChange={changeDopuskDetal}
                        label="Основание"
                        placeholder="Основание"
                    />
                </div>
                <div className="mt-2">
                    <SelectCustom
                        options={vidDopusk.map(item => ({
                            value: item.id_studentJournalVisit_vidDopusk,
                            label: item.vidDopusk
                        }))}
                        onChange={changeVidDopusk}
                        label="Количество"
                        placeholder="Количество"
                    />
                </div>
                <div className="mt-2">
                    <Input label="Шифр квитанции" placeholder="0" type="number" value={values.cipher} onChange={changeCipherAndDate} />
                </div>
                <div className="mt-2">
                    <Input label="Дата квитанции" type="date" value={values.date} onChange={changeCipherAndDate} />
                </div>
                <div className="mt-2">
                    <FileComponent id="d" onChange={changeFile} />
                </div>
                <div className="mt-2 flex justify-content-end">
                    <Button value="Сохранить" />
                </div>
            </form>
        </ModalWindow>
    )
}

export default ModalJurnal
