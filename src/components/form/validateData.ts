import { Condition } from "../../enums/Condition"
import {IAbilities} from "../../interfaces/IAbilities";
import {Skill} from "../../enums/Skill";
import {Size} from "../../enums/Size";
import {Race} from "../../enums/Race";
import {IItem} from "../../interfaces/IItem";
import {IRequestCreature} from "../../interfaces/ICreature";

interface validateDataProps {
    operational: boolean,
    currentHp: number | string,
    maxHp: number | string,
    temporaryHp: number | string,
    armorClass: number | string,
    abilities: IAbilities,
    condition: Condition[],
    skills: Skill[],
    size: Size,
    race: Race,
    backpackItems: IItem[],
    equippedItems: IItem[],
    items: IItem[],
    locationId: number
}
export function validateData(values: validateDataProps) {
    const data: IRequestCreature = {
        operational: values.operational,
        currentHp: 0,
        maxHp: 0,
        temporaryHp: 0,
        armorClass: 0,
        abilities: values.abilities,
        condition: values.condition,
        skills: values.skills,
        size: values.size,
        race: values.race,
        backpackItemIds: [],
        equippedItemIds: [],
        locationId: values.locationId,
    }
    values.backpackItems.map(value => data.backpackItemIds.push(value.id));
    values.equippedItems.map(value => data.equippedItemIds.push(value.id));
    if (typeof values.currentHp === "number") {
        data.currentHp = values.currentHp;
    }
    if (typeof values.armorClass === "number") {
        data.armorClass = values.armorClass;
    }
    if (typeof values.maxHp === "number") {
        data.maxHp = values.maxHp;
    }
    if (typeof values.temporaryHp === "number") {
        data.temporaryHp = values.temporaryHp;
    }
    return data;
}