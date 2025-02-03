import {Orientation} from "../enums/Orientation";
import {IModifiableObject} from "./IModifiableObject";

export interface IDoor extends IModifiableObject{
    visible: boolean
    walkable: boolean
    orientation: Orientation
}