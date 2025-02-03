import {Ability} from "../enums/Ability";
import {DamageType} from "../enums/DamageType";
import {ICampaignObject} from "./ICampaignObject";
import {IItemPosition} from "./IItemPosition";

export interface IItem extends ICampaignObject{
    name: string
    description: string
    itemPosition: IItemPosition
    melee: boolean
    bonus: number
    attackAbility: Ability
    commonDamage: DamageType[]
    optionalDamage: DamageType[]
    missDamage: DamageType[]
}