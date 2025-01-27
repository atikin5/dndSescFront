import {Ability, CharacterDescription, DamageType, Orientation} from "./enums";
import {
    IAbilities,
    IAlive,
    ICampaignObject,
    IClass,
    IDimensions,
    IItemPosition,
    IModifiableObject,
    IPage
} from "./base";
import {IDestructible} from "./base";

export interface ICampaign {
    id: number
    code: number
    status: string
    title: string
    createdAt: string
    startedAt: string
    completedAt: string
}

export interface ILocation {
    id: number
    name: string
}

export interface IFullLocation extends ILocation {
    dndCharacters: ICharacter[]
    creatures: ICreature[]
    destructibleObjects: IDestructibleObject[]
    tiles: ITile[]
    walls: IWall[]
    doors: IDoor[]
}

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

export interface IDestructibleObject extends IDestructible{
    dimensions: IDimensions
}

export interface ICharacter extends IAlive{
    classes: IClass[]
    description: CharacterDescription
    reviveSuccesses: number
    reviveFailures: number
}

export interface ICreature extends IAlive {}

export interface ICampaignsPage extends IPage{
    content: ICampaign[]
}

export interface IWall extends IModifiableObject{
    visible: boolean
    walkable: boolean
    orientation: Orientation
}

export interface IDoor extends IModifiableObject{
    visible: boolean
    walkable: boolean
    orientation: Orientation
}

export interface ITile extends ICampaignObject {
    visibleByCharacter: boolean | null
}

export interface ICharactersPage extends IPage {
    content: ICharacter
}