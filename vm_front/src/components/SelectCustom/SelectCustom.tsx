import React from 'react'
import Select from 'react-select'
import { ISelectProps } from './ISelect'

const SelectCustom: React.FC<ISelectProps> = ({
    options,
    placeholder,
    onChange,
    value,
    label,
    loader,
    isDisabled,
    onFocus
}) => {
    const noOptionsMessage = () => {
        return 'Нет данных'
    }

    const loadingMessage = () => {
        return 'Загрузка...'
    }

    return (
        <>
            {label?.length && <label style={{ fontWeight: 'bold', color: '#454545' }}>{label}</label>}
            <div style={{ marginTop: '5px' }}>
                <Select
                    noOptionsMessage={noOptionsMessage}
                    options={options}
                    placeholder={placeholder}
                    isLoading={loader}
                    loadingMessage={loadingMessage}
                    onChange={onChange}
                    value={value}
                    isDisabled={isDisabled}
                    onFocus={onFocus}
                />
            </div>
        </>
    )
}

export default SelectCustom
