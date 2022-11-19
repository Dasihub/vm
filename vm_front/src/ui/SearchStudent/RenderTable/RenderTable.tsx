import React from 'react'
import { Pencil } from '../../../icons'
import { Print } from '../../../img'
import { IRenderTableProps } from './IRenderTable'

const RenderTable: React.FC<IRenderTableProps> = ({ item, index, showModal, changeReport }) => {
    return (
        <tr>
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{item.discipline}</td>
            <td className="text-center">{item.short_name}</td>
            <td className="text-center">{item.visitDate}</td>
            <td className="text-center">{item.otsenka}</td>
            <td className="text-center">{item.working_off}</td>
            <td className="text-center">{item.paymentStatus}</td>
            <td className="text-center">
                {item.statusUpd ? (
                    <img
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        onClick={showModal.bind(
                            null,
                            item.id_T_StudentJournalVisit_working_off,
                            item.id_otsenka,
                            item.id,
                            item.paymentStatus
                        )}
                        src={Pencil}
                        alt="pencil"
                    />
                ) : null}
                {item.printer ? (
                    <img
                        src={Print}
                        alt="print"
                        style={{ cursor: 'pointer', width: '22px' }}
                        onClick={changeReport.bind(null, item.id)}
                    />
                ) : null}
            </td>
        </tr>
    )
}

export default RenderTable
