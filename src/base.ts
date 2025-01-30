import {Condition, DamageMultiplier, DamageType, DndClassType, Race, Size, Skill} from "./enums";
import {IItem} from "./models";

export interface ICampaignObject {
    id: number
    campaignId: number
    locationId: number
    locationName: string
    type: string
    position: {
        x: number
        y: number
    } | null
}

export interface IPage {
    content: any
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    first: boolean
    numberOfElements: number
    empty: boolean
}

export interface IItemPosition {
    handPosition: number
    fingerPosition: number
    headPosition: number
    bodyPosition: number
    footPosition: number
    cloakPosition: number
    legsPosition: number
    neckPosition: number
}

export interface IAbilities {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
}

export interface IDestructible extends ICampaignObject{
    operational: boolean
    currentHp: number
    maxHp: number
    temporaryHp: number
    armorClass: number
    damageMultipliers: Map<DamageType, DamageMultiplier>
    size: Size
    condition: Condition[]
}

export interface IDimensions {
    width: number
    height: number
}

export interface IAlive extends IDestructible{
    maxItemPosition: IItemPosition
    backpackItems: IItem[]
    equippedItems: IItem[]
    abilities: IAbilities
    race: Race
    maxMovement: number
    movement: number
    macAction: number
    action: number
    maxBonusAction: number
    bonusAction: number
    proficiencyBonus: number
    skills: Skill[]
}

export interface IClass {
    level: number
    type: DndClassType
}

export interface IModifiableObject extends ICampaignObject{
    operational: boolean
    currentHp: number
    maxHp: number
    armorClass: number
    durability: number
    damageMultipliers: Map<DamageType, DamageMultiplier>
}