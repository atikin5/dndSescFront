import React from 'react';
import {ICharacter} from "../models";
import {Link} from "react-router-dom";

interface CharacterProps {
    character: ICharacter
    key: number
}

export function DndCharacter({character}: CharacterProps) {
    return (
        <tr>
            <td>{character.type}</td>
            <td>{character.currentHp}/{character.maxHp}</td>
            <td>{character.armorClass}</td>
            <td>{character.locationId}</td>
            <td>
                <Link to={`/location/${character.locationId}`}>Перейти к локации</Link>
            </td>
            <td>
                <Link to={`/character/${character.id}`}>Редактировать</Link>
            </td>
        </tr>)
}