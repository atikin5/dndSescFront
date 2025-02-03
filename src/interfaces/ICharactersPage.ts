import {IPage} from "./IPage";
import {ICharacter} from "./ICharacter";

export interface ICharactersPage extends IPage {
    content: ICharacter[]
}