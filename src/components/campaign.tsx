import React from 'react';
import {ICampaign} from "../models";

interface CampaignProps {
    campaign: ICampaign
}

export function Campaign({campaign}: CampaignProps) {

    return (<tr>
        <td>{campaign.title}</td>
        <td>{campaign.status}</td>
        <td>{campaign.code}</td>
        <td>{campaign.createdAt}</td>
        <td>{campaign.startedAt}</td>
        <td>{campaign.completedAt}</td>
        <td><button></button></td>
    </tr>)
}
