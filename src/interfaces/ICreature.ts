import {IAlive} from "./IAlive";
import {IAbilities} from "./IAbilities";
import {Condition} from "../enums/Condition";
import {Skill} from "../enums/Skill";
import {Size} from "../enums/Size";
import {Race} from "../enums/Race";
import {IItem} from "./IItem";

export interface ICreature extends IAlive {

}

export interface IRequestCreature {
    operational: boolean,
    currentHp: number,
    maxHp: number,
    temporaryHp: number,
    armorClass: number,
    abilities: IAbilities,
    condition: Condition[],
    skills: Skill[],
    size: Size,
    race: Race,
    backpackItemIds: number[],
    equippedItemIds: number[],
    locationId: number,
}