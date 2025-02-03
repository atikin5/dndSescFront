export interface ICampaignObject {
    id: number;
    campaignId: number;
    locationId: number;
    locationName: string;
    type: string;
    position: {
        x: number;
        y: number;
    } | null;
}