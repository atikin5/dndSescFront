import {ILocation} from "./ILocation";
import {ICreature} from "./ICreature";
import {ICharacter} from "./ICharacter";
import { IDestructibleObject } from "./IDestructibleObject";
import { IDoor } from "./IDoor";
import {ITile} from "./ITile";
import {IWall} from "./IWall";

export interface IFullLocation extends ILocation {
    creatures: ICreature[]
    destructibleObjects: IDestructibleObject[]
    dndCharacters: ICharacter[]
    doors: IDoor[]
    tiles: ITile[]
    walls: IWall[]
}