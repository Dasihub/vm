import { valueType } from '../components/SelectCustom/ISelect'
import { typeTab } from '../components/Tabs/ITabs'

export const amount: valueType[] = [
    { value: 1, label: 'Первый' },
    { value: 2, label: 'Второй' },
    { value: 3, label: 'Третий' },
    { value: 4, label: 'Четвертый' },
    { value: 5, label: 'Пятый' }
]

export const typeGroup: valueType[] = [
    { value: 0, label: 'Группа' },
    { value: 1, label: 'Подгруппа' }
]

export const subGroup: valueType[] = [
    { value: 1, label: '1 - Подгруппа' },
    { value: 2, label: '2 - Подгруппа' },
    { value: 3, label: '3 - Подгруппа' },
    { value: 4, label: '4 - Подгруппа' }
]

export const subGroupFor: valueType[] = [
    { value: 0, label: '--' },
    { value: 1, label: '1 - Подгруппа' },
    { value: 2, label: '2 - Подгруппа' },
    { value: 3, label: '3 - Подгруппа' },
    { value: 4, label: '4 - Подгруппа' }
]

export const dekanatDataTab: typeTab[] = [
    { title: 'Поиск студентов', id: 1 },
    { title: 'Деканат', id: 2 }
]

export const teacherDataTab: typeTab[] = [
    { title: 'Преподователь', id: 1 },
    { title: 'Поиск студентов', id: 2 }
]

export const isScreen = document.body.offsetWidth > 1000
