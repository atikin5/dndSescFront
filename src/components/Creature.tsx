import React from "react";
import {ICreature} from "../models";

interface CreatureProps {
    creature: ICreature;
    key: number;
}

export function Creature({ creature }: CreatureProps) {

    return(
        <tr>
            <td>{creature.type}</td>
            <td>{creature.currentHp}/{creature.maxHp}</td>
            <td>{creature.armorClass}</td>
            <td>{creature.locationId}</td>
            <td><button></button></td>
        </tr>)
}