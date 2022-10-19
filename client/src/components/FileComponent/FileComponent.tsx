import React from 'react'
import styles from './styles.module.scss'
import { IFileProps } from './IFileComponent'

const FileComponent: React.FC<IFileProps> = ({ id, onChange }) => {
    return (
        <>
            <input id={id} type="file" name="fileUpload" onChange={onChange} />

            <div className={styles.line}>
                <label htmlFor={id} className={`${styles.fileImage} ${styles.label}`}>
                    <div className={styles.start}>
                        <i className="fa fa-download" style={{ fontSize: '30px' }} aria-hidden="true" />
                        <div style={{ marginTop: '10px' }}>Загрузить файл</div>
                        {/*<span id="file-upload-btn" className={styles.btn}>*/}
                        {/*    Выбрать файл*/}
                        {/*</span>*/}
                    </div>
                </label>
            </div>
        </>
    )
}

export default FileComponent
