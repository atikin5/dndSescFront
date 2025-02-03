import { IDestructible } from './IDestructible';
import { IItemPosition } from './IItemPosition';
import { IAbilities } from './IAbilities';
import { Race } from '../enums/Race';
import { Skill } from '../enums/Skill';
import { IItem } from './IItem';

export interface IAlive extends IDestructible {
    maxItemPosition: IItemPosition;
    backpackItems: IItem[];
    equippedItems: IItem[];
    abilities: IAbilities;
    race: Race;
    maxMovement: number;
    movement: number;
    macAction: number;
    action: number;
    maxBonusAction: number;
    bonusAction: number;
    proficiencyBonus: number;
    skills: Skill[];
}