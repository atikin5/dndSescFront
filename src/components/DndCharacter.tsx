import React, {useContext} from 'react';
import {ICharacter} from "../models";
import {Link} from "react-router-dom";
import {Editable} from "../enums";
import {ModalContext} from "../context/ModalContext";

interface CharacterProps {
    location: boolean
    character: ICharacter
    key: number
}

export function DndCharacter({character, location}: CharacterProps) {
    const {openModal} = useContext(ModalContext)
    return (
        <tr>
            <td>{character.type}</td>
            <td>{character.currentHp}/{character.maxHp}</td>
            <td>{character.armorClass}</td>
            {
                location &&
                <td>
                    {character.locationId != undefined &&
                        <Link to={`/location/${character.locationId}`}>{character.locationName}</Link>}
                </td>
            }
            <td>
                <button onClick={() => openModal(Editable.DND_CHARACTER, character.id)}>Редактировать</button>
            </td>
        </tr>)
}