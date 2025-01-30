import React from "react";
import {ReactNode} from "react";

interface LocationTableProps {
    locations: ReactNode
}

export function LocationTable({ locations }: LocationTableProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Существ</th>
                <th>Персонажей</th>
                <th>Объектов</th>
                <th>Тайлов</th>
                <th>Стен</th>
                <th>Дверей</th>
                <th>Редактировать</th>
            </tr>
            </thead>
            <tbody>
            {locations}
            </tbody>
        </table>)
}