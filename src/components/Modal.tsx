import React, {useContext} from "react";
import {ModalContext} from "../context/ModalContext";
import {EditCreature} from "./EditCreature";
import {EditDndCharacter} from "./EditDndCharacter";

interface ModalProps {
    modalTitle: string
}

export function Modal({modalTitle}: ModalProps) {
    const {closeModal, modalType, editedId} = useContext(ModalContext)
    return (
        <>
            <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0" onClick={closeModal}/>
            <div >
                {modalType === "CREATURE" && <EditCreature editedId={editedId}/>}
                {modalType === "DND_CHARACTER" && <EditDndCharacter editedId={editedId}/>}
            </div>
        </>
    )
}