import React from 'react';
import {ICharacter} from "../models";
import {Link} from "react-router-dom";

interface CharacterProps {
    location: boolean
    character: ICharacter
    key: number
}

export function DndCharacter({character, location}: CharacterProps) {
    return (
        <tr>
            <td>{character.type}</td>
            <td>{character.currentHp}/{character.maxHp}</td>
            <td>{character.armorClass}</td>
            {location && <td>{character.locationId}</td>}
            <td>
                {
                    location &&
                    character.locationId != undefined &&
                    <Link to={`/location/${character.locationId}`}>Перейти к локации</Link>
                }
            </td>
            <td>
                <div>Редактировать</div>
            </td>
        </tr>)
}