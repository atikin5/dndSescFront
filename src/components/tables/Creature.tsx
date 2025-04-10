import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {ModalContext} from "../../context/ModalContext";
import {ModalTypeEnum} from "../../enums/ModalTypeEnum";
import {ICreature} from "../../interfaces/ICreature";

interface CreatureProps {
    location: boolean
    creature: ICreature
    key: number
    campaignId: number
}

export function Creature({creature, location, campaignId}: CreatureProps) {
    const {openModal} = useContext(ModalContext)
    console.log(creature.locationName)
    return (
        <tr>
            <td>{creature.type}</td>
            <td>{creature.currentHp}/{creature.maxHp}</td>
            <td>{creature.armorClass}</td>
            {
                location &&
                <td>
                    {creature.locationId !== undefined &&
                        <Link to={`/campaign/${campaignId}/location/${creature.locationId}`}>{creature.locationName}</Link>}
                </td>
            }
            <td>
                <button onClick={() => openModal(ModalTypeEnum.CREATURE, creature.id, campaignId)}>Редактировать</button>
            </td>
        </tr>)
}