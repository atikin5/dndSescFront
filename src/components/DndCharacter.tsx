import React from 'react';
import {ICharacter} from "../models";

interface CharacterProps {
    character: ICharacter
}

export function DndCharacter({character}: CharacterProps) {
    return (
        <tr>
            <td>{character.type}</td>
            <td>{character.currentHp}/{character.maxHp}</td>
            <td>{character.armorClass}</td>
            <td>{character.locationId}</td>
            <td>
                <button></button>
            </td>
        </tr>)
}