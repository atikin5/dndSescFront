import React, {ReactNode} from "react";

interface CampaignTableProps {
    campaigns: ReactNode
}

export function CampaignTable({campaigns}: CampaignTableProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Статус</th>
                <th>Код покдлючения</th>
                <th>Создана</th>
                <th>Начата</th>
                <th>Завершена</th>
                <th>Перейти</th>
            </tr>
            </thead>
            <tbody>
            {campaigns}
            </tbody>
        </table>)
}