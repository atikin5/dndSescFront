import {useCreature} from "../../hooks/creature";
import React, {useContext} from "react";
import {MoveContext} from "../../context/MoveContext";
import {ModalContext} from "../../context/ModalContext";
import {MovableType} from "../../enums/MovableType";

interface CreatureModalOnMapProps {
    creatureId: number;
    GRID_SIZE: number;
}

export function CreatureModalWatch({creatureId, GRID_SIZE}: CreatureModalOnMapProps) {
    const {creature} = useCreature({creatureId})
    const {closeModal} = useContext(ModalContext)
    if (creature !== undefined && creature.position === null) {
        creature.position = {x: 0, y: 0};
    }
    return (
        <>
            {creature !== undefined && <div
                style={{
                    left: ((creature.position.x + 1) * GRID_SIZE),
                    top: ((creature.position.y + 1) * GRID_SIZE),
                    borderRadius: 5
                }}
                className="absolute bg-yellow-300 h-40 w-40 z-20 opacity-85"
            >
                <div>Название: {creature.type}</div>
                <div>Очков здоровья: {creature.currentHp}</div>
                <div>Класс брони: {creature.armorClass}</div>
                <button onClick={closeModal}>Закрыть</button>
            </div>}
        </>
    )
}