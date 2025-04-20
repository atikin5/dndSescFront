import {ICreature} from "../../interfaces/ICreature";
import React, {useContext, useEffect, useState} from "react";
import {ModalContext} from "../../context/ModalContext";
import {ModalTypeEnum} from "../../enums/ModalTypeEnum";
// @ts-ignore
import Image from "../../icons/creatures/goblin.png"

interface PlayerCreatureProps {
    creature: ICreature;
    path: { x: number; y: number }[];
    GRID_SIZE: number;
}

export function PlayerCreature({creature, path, GRID_SIZE}: PlayerCreatureProps) {
    const {openModal} = useContext(ModalContext)
    const [position, setPosition] = useState<{x: number, y: number}>(creature.position)
    useEffect(() => {
        if (path !== undefined) {
            for (let i = 0; i < path.length; i++) {
                const timer = setTimeout(() => {
                    setPosition(path[i]);
                    console.log("aaaa")
                }, 1000);

            }
        }
    }, [path]);

    return (
        <div
            onClick={() => openModal(ModalTypeEnum.CREATURE_ON_PLAYER_MAP, creature.id, creature.campaignId)}
            style={{
                width: GRID_SIZE,
                height: GRID_SIZE,
                top: `${(position.y) * GRID_SIZE}px`,
                left: `${(position.x) * GRID_SIZE}px`,
                position: "absolute",
                backgroundImage: `url(${Image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
            className=" z-10">
        </div>

    )
}