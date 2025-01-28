import React, {ReactNode} from "react";

interface DndCharacterTableProps {
    location: boolean
    dndCharacters: ReactNode
}

export function DndCharacterTable({dndCharacters, location}: DndCharacterTableProps) {
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
            {dndCharacters}
            </tbody>
        </table>)
}