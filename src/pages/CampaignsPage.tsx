import React from 'react'
import {useCampaigns} from "../hooks/campaigns";
import {Loader} from "../components/Loader";
import {ErrorMessage} from "../components/ErrorMessage";
import {ICampaign} from "../models";
import {Campaign} from "../components/Campaign";
import {CampaignTable} from "../components/CampaignTable";

export function CampaignsPage() {
    const page: number = 0
    const size: number = 5
    const {campaigns, error, loading} = useCampaigns({page: page, size: size})
    return (
        <div className="select-none">
            <CampaignTable
                campaigns={campaigns.map((campaign: ICampaign) => <Campaign campaign={campaign} key={campaign.id}/>)}
            />
            <div>
                {loading && <Loader/>}
                {error && <ErrorMessage error={error}/>}
            </div>
        </div>);
}