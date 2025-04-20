import React, {useContext} from "react";
import {ModalContext} from "../../context/ModalContext";
import {EditDndCharacter} from "../EditDndCharacter";
import {CreatureModal} from "../form/CreatureModal";
import {CreatureModalOnMap} from "../map/CreatureModalOnMap";
import {CreatureModalOnPlayerMap} from "../map/CreatureModalOnPlayerMap";
import {CreatureModalWatch} from "../map/CreatureModalWatch";

interface ModalProps {
    modalTitle: string
}

export function Modal({modalTitle}: ModalProps) {
    const {modalType, editedId, campaignId} = useContext(ModalContext)
    const GRID_SIZE = 80
    return (
        <>
            {modalType === "CREATURE" && <CreatureModal creatureId={editedId} campaignId={campaignId}/>}
            {modalType === "DND_CHARACTER" && <EditDndCharacter editedId={editedId}/>}
            {modalType === "CREATURE_ON_MAP" && <CreatureModalOnMap GRID_SIZE={GRID_SIZE} creatureId={editedId}/>}
            {modalType === "CREATURE_ON_PLAYER_MAP" && <CreatureModalOnPlayerMap creatureId={editedId} GRID_SIZE={GRID_SIZE}/>}
            {modalType === "CREATURE_PLAYER" && <CreatureModalWatch creatureId={editedId} GRID_SIZE={GRID_SIZE}/>}
        </>
    )
}