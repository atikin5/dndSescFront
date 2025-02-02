import React, {useContext} from "react";
import {ModalContext} from "../../context/ModalContext";
import {EditCreatureModal} from "../EditCreatureModal";
import {EditDndCharacter} from "../EditDndCharacter";
import {CreatureModal} from "../form/CreatureModal";

interface ModalProps {
    modalTitle: string
}

export function Modal({modalTitle}: ModalProps) {
    const {closeModal, modalType, editedId, campaignId} = useContext(ModalContext)
    return (
        <>
            {/*<div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0" onClick={closeModal}/>*/}
            <div >
                {modalType === "CREATURE" && <CreatureModal creatureId={editedId} campaignId={campaignId} />}
                {modalType === "DND_CHARACTER" && <EditDndCharacter editedId={editedId}/>}
            </div>
        </>
    )
}
//убрать alert