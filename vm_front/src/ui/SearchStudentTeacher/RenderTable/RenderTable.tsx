import React from 'react'
import { Pencil } from '../../../icons'
import { IRenderTableProps } from './IRenderTable'

const RenderTable: React.FC<IRenderTableProps> = ({ item, index, showModal }) => {
    return (
        <tr>
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{item.discipline}</td>
            <td className="text-center">{item.short_name}</td>
            <td className="text-center">{item.visitDate}</td>
            <td className="text-center">{item.otsenka}</td>
            <td className="text-center">{item.paymentStatus}</td>
            <td className="text-center">{item.working_off}</td>
            <td className="text-center">
                {item.statusUpd ? (
                    <img
                        onClick={showModal.bind(null, item.id_otsenka, item.id, item.paymentStatus, item.working_off)}
                        style={{ cursor: 'pointer' }}
                        src={Pencil}
                        alt="pencil"
                    />
                ) : null}
            </td>
        </tr>
    )
}

export default RenderTable
