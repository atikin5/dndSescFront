import React from "react";
import {useCreature} from "../hooks/creature";
import {Loader} from "./Loader";
import {ErrorMessage} from "./ErrorMessage";
import {ICreature} from "../models";
import {EditCreature} from "./EditCreature";

interface EditCreatureModal {
    editedId: number
}

export function EditCreatureModal({editedId}: EditCreatureModal) {
    const {creature, creatureLoading, creatureError} = useCreature({creatureId: editedId})
    console.log(creature.length)
    return (
        <div>
            <div>
                {creature.map((creature: ICreature) => <EditCreature creature={creature}/>)}
            </div>
            {creatureError && <ErrorMessage error={creatureError}/>}
            {creatureLoading && <Loader/>}
        </div>
    )
}