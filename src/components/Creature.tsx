import React from "react";
import {ICreature} from "../models";
import {Link} from "react-router-dom";

interface CreatureProps {
    creature: ICreature
    key: number
}

export function Creature({creature}: CreatureProps) {
    return (
        <tr>
            <td>{creature.type}</td>
            <td>{creature.currentHp}/{creature.maxHp}</td>
            <td>{creature.armorClass}</td>
            <td>{creature.locationId}</td>
            <td>
                <Link to={`/location/${creature.locationId}`}>Перейти к локации</Link>
            </td>
            <td>
                <Link to={`/creature/${creature.id}`}>Редактировать</Link>
            </td>
        </tr>)
}