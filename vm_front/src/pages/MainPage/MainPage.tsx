import React, { ReactElement } from 'react'
import { Dekanat, ModalJurnal, SearchStudent } from '../../ui'
import { Tabs } from '../../components'
import { dekanatDataTab } from '../../config/data'
import styles from './styles.module.scss'
import { authSlice } from '../../redux/reducers/AuthSlice'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../../hooks/useTypeSelector'

const MainPage: React.FC = () => {
    const dispatch = useDispatch()
    const { id_role } = useTypeSelector(state => state.authReducer)
    const { role3 } = authSlice.actions
    const [isPage, setIsPage] = React.useState<number>(1)
    const [isModal, setIsModal] = React.useState<boolean>(false)

    const showModal = () => {
        document.body.style.overflowY = 'hidden'
        setIsModal(true)
    }

    const hideModal = () => {
        document.body.style.overflowY = 'visible'
        setIsModal(false)
    }

    const isUi = (): ReactElement => {
        if (isPage == 1) {
            return <SearchStudent />
        }
        return <Dekanat showModal={showModal} />
    }

    React.useEffect(() => {
        if (id_role != 3) {
            dispatch(role3())
        }
    }, [])

    return (
        <>
            <div className={styles.tab}>
                <Tabs isPage={isPage} data={dekanatDataTab} changePage={setIsPage} />
            </div>
            {isUi()}
            {isModal && <ModalJurnal hideModal={hideModal} />}
        </>
    )
}

export default MainPage
