import React, {ReactNode} from "react";

interface CreatureTableProps {
    location: boolean
    creatures: ReactNode
}

export function CreatureTable({creatures, location}: CreatureTableProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>Тип</th>
                <th>Здоровье</th>
                <th>Броня</th>
                {location && <th>Локация</th>}
                {location && <th>Перейти к локации</th>}
                <th>Редактировать</th>
            </tr>
            </thead>
            <tbody>
            {creatures}
            </tbody>
        </table>)
}