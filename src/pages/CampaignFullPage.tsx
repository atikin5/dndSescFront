import React from 'react'
import {useCampaigns} from "../hooks/campaigns";
import {Loader} from "../components/Loader";
import {ErrorMessage} from "../components/ErrorMessage";
import {ICampaign} from "../models";
import {Campaign} from "../components/Campaign";
import {CampaignTable} from "../components/CampaignTable";

interface CampaignFullPageProps {
    campaignId: number
}

export function CampaignFullPage() {
    const page: number = 0
    const size: number = 5
    return (
        <div>

        </div>)
    // return (<div>
    //     <CampaignTable
    //         campaigns={campaigns.map((campaign: ICampaign) => <Campaign campaign={ campaign } key={campaign.id} />)}
    //     />
    //     <div>
    //         {loading && <Loader />}
    //         {error && <ErrorMessage error={ error } />}
    //     </div>
    // </div>);
}