import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {ModalContext} from "../../context/ModalContext";
import {ICharacter} from "../../interfaces/ICharacter";
import {ModalTypeEnum} from "../../enums/ModalTypeEnum";

interface CharacterProps {
    location: boolean
    character: ICharacter
    key: number
    campaignId: number
}

export function DndCharacter({character, location, campaignId}: CharacterProps) {
    const {openModal} = useContext(ModalContext)
    return (
        <tr>
            <td>{character.type}</td>
            <td>{character.currentHp}/{character.maxHp}</td>
            <td>{character.armorClass}</td>
            {
                location &&
                <td>
                    {character.locationId !== undefined &&
                        <Link to={`/campaign/${campaignId}location/${character.locationId}`}>{character.locationName}</Link>}
                </td>
            }
            <td>
                <button onClick={() => openModal(ModalTypeEnum.DND_CHARACTER, character.id, campaignId)}>Редактировать</button>
            </td>
        </tr>)
}