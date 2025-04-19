import React, {useContext, useState} from "react";
import {ICreature} from "../../interfaces/ICreature";
import {ModalContext} from "../../context/ModalContext";
import {ModalTypeEnum} from "../../enums/ModalTypeEnum";
import {MoveContext} from "../../context/MoveContext";
import {MovableType} from "../../enums/MovableType";
import {  useDraggable} from "@dnd-kit/core";
interface CreatureProps {
    creature: ICreature;
}

export function Creature({creature}: CreatureProps) {
    const GRID_SIZE = 40;
    const [coordinates, setCoordinates] = useState<{ x: number; y: number }[]>([]);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [lastGridPosition, setLastGridPosition] = useState<{ x: number; y: number } | null>(null);

    const {openModal} = useContext(ModalContext)
    const {movableId, movableType} = useContext(MoveContext)
    let moving: boolean = movableId === creature.id && movableType === MovableType.CREATURE
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `creature-${creature.id}`,
        disabled: !moving,
        onDragMove: (event) => {
            const { x, y } = event;
            const gridX = Math.floor(x / GRID_SIZE);
            const gridY = Math.floor(y / GRID_SIZE);

            // Проверка, изменились ли координаты
            const lastCoord = coordinates[coordinates.length - 1];
            if (!lastCoord || lastCoord.x !== gridX || lastCoord.y !== gridY) {
                setCoordinates([...coordinates, { x: gridX, y: gridY }]);
            }
        },
        onDragEnd: (event) => {
            const {x, y} = event;
            setPosition({x, y});
        }
    });
    if (creature.position === null) {
        creature.position = { x: 0, y: 0 };
    }
    return (
        <>
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                onClick={() => openModal(ModalTypeEnum.CREATURE_ON_MAP, creature.id, creature.campaignId)}
                style={{
                    left: (creature.position.x * 40),
                    top: (creature.position.y * 40),
                    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                    cursor: moving ? "grab" : "default",
                }}
                className="absolute bg-green-600 h-10 w-10 z-10">
            </div>

        </>
    )
}