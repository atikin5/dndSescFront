import {IPage} from "./IPage";
import {ICampaign} from "./ICampaign";

export interface ICampaignsPage extends IPage{
    content: ICampaign[]
}