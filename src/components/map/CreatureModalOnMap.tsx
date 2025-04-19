import React, {useContext} from "react";
import {useCreature} from "../../hooks/creature";
import {MoveContext} from "../../context/MoveContext";
import {MovableType} from "../../enums/MovableType";

interface CreatureModalOnMapProps {
    creatureId: number;
}

export function CreatureModalOnMap({creatureId}: CreatureModalOnMapProps) {
    const {creature} = useCreature({creatureId})
    const {startMove} = useContext(MoveContext)
    if (creature !== undefined && creature.position === null) {
        creature.position = {x: 0, y: 0};
    }
    return (
        <>
            {creature !== undefined && <div
                style={{
                    left: ((creature.position.x + 1) * 40),
                    top: ((creature.position.y + 1) * 40),
                }}
                className="relative bg-yellow-300 h-40 w-32 z-20 opacity-85"
            >
                <button onClick={()=>
                    startMove(MovableType.CREATURE, creatureId)
                }>Передвижение</button>
            </div>}
        </>
    )
}