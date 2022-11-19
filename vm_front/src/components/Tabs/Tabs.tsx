import React from 'react'
import styles from './styles.module.scss'
import { ITabsProps } from './ITabs'

const Tabs: React.FC<ITabsProps> = ({ data, changePage, isPage }) => {
    return (
        <div className={styles.container}>
            {data.map(item => (
                <div
                    onClick={changePage.bind(null, item.id)}
                    key={item.id}
                    className={isPage == item.id ? `${styles.tab} ${styles.active_tab}` : styles.tab}
                >
                    {item.title}
                </div>
            ))}
        </div>
    )
}

export default Tabs
