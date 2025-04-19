import {MovableType} from "../enums/MovableType";
import React, {createContext, useState} from "react";

interface IMoveContext {
    move: boolean
    movableType: MovableType
    movableId: number
    startMove: (movableType: MovableType, movableId: number) => void
    endMove: () => void
}

export const MoveContext = createContext<IMoveContext>({
    move: false,
    movableType: undefined,
    movableId: null,
    startMove: (movableType: MovableType, movableId: number) => {
    },
    endMove: () => {
    }
})

export const MoveState = ({children}: { children: React.ReactNode }) => {
    const [move, setMove] = useState<boolean>(false)
    const [movableType, setMovableType] = useState<MovableType>(undefined)
    const [movableId, setMovableId] = useState(null)

    const startMove = (movableType: MovableType, movableId: number,) => {
        setMove(true)
        setMovableId(movableId)
        setMovableType(movableType)
    }

    const endMove = () => {
        setMove(false)
        setMovableId(null)
        setMovableType(undefined)
    }

    return (
        <MoveContext.Provider value={{move, startMove, endMove, movableType, movableId}}>
            {children}
        </MoveContext.Provider>
    )
}