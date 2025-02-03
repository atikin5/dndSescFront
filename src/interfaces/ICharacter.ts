import {IAlive} from "./IAlive";
import {CharacterDescription} from "../enums/CharacterDescription";
import {IClass} from "./IClass";

export interface ICharacter extends IAlive{
    classes: IClass[]
    description: CharacterDescription
    reviveSuccesses: number
    reviveFailures: number
}