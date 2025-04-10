import React from "react";
import {ICreature} from "../../interfaces/ICreature";

interface CreatureProps {
    creature: ICreature;
}

export function Creature({creature}: CreatureProps) {

    return (
        <div
            style={{
                left: (creature.position.x * 40),
                top: (creature.position.y * 40),
            }}
            className="absolute bg-green-600 h-10 w-10 z-10">

        </div>
    )
}