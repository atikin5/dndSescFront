import { ICampaignObject } from './ICampaignObject';
import { Size } from '../enums/Size';
import { Condition } from '../enums/Condition';
import { DamageType } from '../enums/DamageType';
import {DamageMultiplier} from "../enums/DamageMultiplier";

export interface IDestructible extends ICampaignObject {
    operational: boolean;
    currentHp: number;
    maxHp: number;
    temporaryHp: number;
    armorClass: number;
    damageMultipliers: Map<DamageType, DamageMultiplier>
    size: Size;
    condition: Condition[];
}