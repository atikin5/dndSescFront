import React, {useContext} from "react";
import {ICreature} from "../../models";
import {Link} from "react-router-dom";
import {ModalContext} from "../../context/ModalContext";
import {Editable} from "../../enums";

interface CreatureProps {
    location: boolean
    creature: ICreature
    key: number
}

export function Creature({creature, location}: CreatureProps) {
    const {openModal} = useContext(ModalContext)

    return (
        <tr>
            <td>{creature.type}</td>
            <td>{creature.currentHp}/{creature.maxHp}</td>
            <td>{creature.armorClass}</td>
            {
                location &&
                <td>
                    {creature.locationId != undefined &&
                        <Link to={`/location/${creature.locationId}`}>{creature.locationName}</Link>}
                </td>
            }
            <td>
                <button onClick={() => openModal(Editable.CREATURE, creature.id)}>Редактировать</button>
            </td>
        </tr>)
}