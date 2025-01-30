import React, {createContext, useState} from "react";
import {Editable} from "../enums";

interface IModalContext {
    modal: boolean
    modalType: Editable
    editedId: number
    openModal: (modalType: Editable, editedId: number) => void
    closeModal: () => void
}

export const ModalContext = createContext<IModalContext>({
    modal: false,
    modalType: undefined,
    editedId: null,
    openModal: (modalType: Editable, editedId: number) => {},
    closeModal: () => {}

})

export const ModalState = ({ children }: {children: React.ReactNode}) => {
    const [modal, setModal] = useState<boolean>(false)
    const [modalType, setModalType] = useState<Editable>(undefined)
    const [editedId, setEditedId] = useState<number>(null)

    const openModal = (modalType: Editable, editedId: number) => {
        setModal(true)
        setModalType(modalType)
        setEditedId(editedId)
    }
    const closeModal = () => {
        setModal(false)
        setModalType(undefined)
        setEditedId(null)
    }

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal, modalType, editedId }}>
            {children}
        </ModalContext.Provider>
    )
}