import React, {useContext} from "react";
import {ModalContext} from "../../context/ModalContext";
import {EditDndCharacter} from "../EditDndCharacter";
import {CreatureModal} from "../form/CreatureModal";
import {CreatureModalOnMap} from "../map/CreatureModalOnMap";

interface ModalProps {
    modalTitle: string
}

export function Modal({modalTitle}: ModalProps) {
    const {modalType, editedId, campaignId} = useContext(ModalContext)
    console.log(campaignId);
    console.log(editedId);
    return (
        <div className="z-10 relative">
            <div >
                {modalType === "CREATURE" && <CreatureModal creatureId={editedId} campaignId={campaignId} />}
                {modalType === "DND_CHARACTER" && <EditDndCharacter editedId={editedId}/>}
                {modalType === "CREATURE_ON_MAP" && <CreatureModalOnMap creatureId={editedId}/>}
            </div>
        </div>
    )
}