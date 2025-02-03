import {ICampaignObject} from "./ICampaignObject";

export interface ITile extends ICampaignObject {
    visibleByCharacter: boolean | null
}