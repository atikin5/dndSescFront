import React from "react";
import {ICreature} from "../models";
import {Link} from "react-router-dom";

interface CreatureProps {
    location: boolean
    creature: ICreature
    key: number
}

export function Creature({creature, location}: CreatureProps) {
    return (
        <tr>
            <td>{creature.type}</td>
            <td>{creature.currentHp}/{creature.maxHp}</td>
            <td>{creature.armorClass}</td>
            {location && <td>{creature.locationId}</td>}
            <td> {
                location &&
                creature.locationId != undefined &&
                <Link to={`/location/${creature.locationId}`}>Перейти к локации</Link>
            }
            </td>
            <td>
                <div>Редактировать</div>
            </td>
        </tr>)
}