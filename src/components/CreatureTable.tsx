import React, {ReactNode} from "react";

interface CreatureTableProps {
    creatures: ReactNode
}

export function CreatureTable({creatures}: CreatureTableProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>Тип</th>
                <th>Здоровье</th>
                <th>Броня</th>
                <th>Локация</th>
                <th>Перейти к локации</th>
                <th>Редактировать</th>
            </tr>
            </thead>
            <tbody>
            {creatures}
            </tbody>
        </table>)
}