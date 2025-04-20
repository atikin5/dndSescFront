import {useCreature} from "../../hooks/creature";
import React, {useContext} from "react";
import {ModalContext} from "../../context/ModalContext";
import {ModalTypeEnum} from "../../enums/ModalTypeEnum";

interface CreatureModalOnMapPlayerProps {
    creatureId: number;
    GRID_SIZE: number;
}

export function CreatureModalOnPlayerMap({creatureId, GRID_SIZE}: CreatureModalOnMapPlayerProps) {
    const {creature} = useCreature({creatureId})
    const {closeModal, openModal} = useContext(ModalContext)
    if (creature !== undefined && creature.position === null) {
        creature.position = {x: 0, y: 0};
    }
    let campaignId = 1;
    if (creature !== undefined) {
        campaignId = creature.campaignId
    }
    return (
        <>
            {creature !== undefined && <div
                style={{
                    left: ((creature.position.x + 1) * GRID_SIZE),
                    top: ((creature.position.y + 1) * GRID_SIZE),
                    borderRadius: 5
                }}
                className="absolute bg-yellow-300 h-40 w-32 z-20 opacity-85"
            >
                <button onClick={()=>{
                    closeModal()
                    openModal(ModalTypeEnum.CREATURE_PLAYER, creatureId, campaignId)
                }}>Характеристики</button>
            </div>}
        </>
    )
}