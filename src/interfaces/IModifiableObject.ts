import {DamageType} from "../enums/DamageType";
import {DamageMultiplier} from "../enums/DamageMultiplier";
import {ICampaignObject} from "./ICampaignObject";

export interface IModifiableObject extends ICampaignObject{
    operational: boolean
    currentHp: number
    maxHp: number
    armorClass: number
    durability: number
    damageMultipliers: Map<DamageType, DamageMultiplier>
}