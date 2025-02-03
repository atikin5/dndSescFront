import React from "react";
import {ICreature} from "../interfaces/ICreature";

interface EditCreatureProps {
    creature: ICreature
}

export function EditCreature({creature}: EditCreatureProps) {

    return (
        <div>
            <div>{creature.type}</div>
        </div>
    )
}