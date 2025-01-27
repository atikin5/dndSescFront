import React, {ReactNode} from "react";

interface DndCharacterTableProps {
    dndCharacters: ReactNode
}

export function DndCharacterTable({dndCharacters}: DndCharacterTableProps) {
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
            {dndCharacters}
            </tbody>
        </table>)
}