import {IPage} from "./IPage";
import {ICreature} from "./ICreature";

export interface ICreaturesPage extends IPage {
    content: ICreature[]
}