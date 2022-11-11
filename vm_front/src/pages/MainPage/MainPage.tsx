import React, { ReactElement } from 'react'
import { Dekanat, ModalJurnal, SearchStudent } from '../../ui'
import { Tabs } from '../../components'
import { dekanatDataTab } from '../../config/data'
import styles from './styles.module.scss'

const MainPage: React.FC = () => {
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
