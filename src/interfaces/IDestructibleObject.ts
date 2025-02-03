import {IDestructible} from "./IDestructible";
import {IDimensions} from "./IDimensions";

export interface IDestructibleObject extends IDestructible{
    dimensions: IDimensions
}