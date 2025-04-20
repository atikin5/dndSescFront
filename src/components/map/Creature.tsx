import React, {useContext} from "react";
import {ICreature} from "../../interfaces/ICreature";
import {ModalContext} from "../../context/ModalContext";
import {ModalTypeEnum} from "../../enums/ModalTypeEnum";
import {MoveContext} from "../../context/MoveContext";
import {MovableType} from "../../enums/MovableType";
import {useDraggable} from "@dnd-kit/core";

interface CreatureProps {
    creature: ICreature;
    path: { x: number; y: number }[];
    position: { x: number; y: number };
    GRID_SIZE: number;

}

export function Creature({creature, position, path, GRID_SIZE}: CreatureProps) {
    const {openModal} = useContext(ModalContext)
    const {movableId, movableType} = useContext(MoveContext)
    let moving: boolean = movableId === creature.id && movableType === MovableType.CREATURE
    let currentPosition: { x: number; y: number } = creature.position;
    if (position !== null) {
        currentPosition = position;
    } if (path.length !== 0) {
        currentPosition = path[path.length - 1];
    }
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: "draggable",
        disabled: movableId !== creature.id,
    });


    return (

        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            onClick={() => openModal(ModalTypeEnum.CREATURE_ON_MAP, creature.id, creature.campaignId)}
            style={{
                width: GRID_SIZE,
                height: GRID_SIZE,
                backgroundColor: "blue",
                top: `${(currentPosition.y) * GRID_SIZE}px`,
                left: `${(currentPosition.x) * GRID_SIZE}px`,
                //transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: moving ? "grab" : "default",
                position: "absolute",
                transition: "transform 0.1s"
            }}
            className="bg-green-600 z-10">
        </div>

    )
}