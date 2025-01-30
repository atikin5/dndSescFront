import React from 'react';
import {ICampaign} from "../../models";
import {Link} from "react-router-dom";
import moment from "moment";

interface CampaignProps {
    campaign: ICampaign
    key: number
}

export function Campaign({campaign}: CampaignProps) {

    return (
        <tr>
            <td>{campaign.title}</td>
            <td>{campaign.status}</td>
            <td>{campaign.code}</td>
            <td>{moment(campaign.createdAt).format('ll')}</td>
            <td>
                {
                    campaign.startedAt == null ?
                        "Нет" :
                        moment(campaign.startedAt).format('ll')
                }
            </td>
            <td>
                {
                    campaign.completedAt == null ?
                        "Нет" :
                        moment(campaign.completedAt).format('ll')
                }
            </td>
            <td>
                <Link to={`/campaign/${campaign.id}`}>Перейти</Link>
            </td>
        </tr>)
}
