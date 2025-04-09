import React from "react";
import {ICreature} from "../../interfaces/ICreature";

interface CreatureProps {
    creature: ICreature;
}

export function Creature({creature}: CreatureProps) {

    return (
        <div className="creature">

        </div>
    )
}