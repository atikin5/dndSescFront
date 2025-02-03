import {Orientation} from "../enums/Orientation";
import {IModifiableObject} from "./IModifiableObject";

export interface IWall extends IModifiableObject{
    visible: boolean
    walkable: boolean
    orientation: Orientation
}