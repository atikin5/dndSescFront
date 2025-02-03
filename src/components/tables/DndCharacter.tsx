import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {ModalContext} from "../../context/ModalContext";
import {ICharacter} from "../../interfaces/ICharacter";
import {Editable} from "../../enums/Editable";

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