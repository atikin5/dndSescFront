import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Tiles} from "../components/map/Tiles";
import {ITile} from "../interfaces/ITile";
import {Tile} from "../components/map/Tile";
import {useTiles} from "../hooks/tiles";
import {Creatures} from "../components/map/Creatures";
import {ICreature} from "../interfaces/ICreature";
import {Creature} from "../components/map/Creature";
import {useCreatures} from "../hooks/creatures";
import {Modal} from "../components/references/Modal";
import {ModalContext} from "../context/ModalContext";
import {Active, DndContext} from "@dnd-kit/core";
import {DroppableArea} from "../components/map/MapDroppable";
import {MoveContext} from "../context/MoveContext";
import {MovableType} from "../enums/MovableType";
import {useSendCreaturePath} from "../hooks/sendCreaturePath";
import axios, {AxiosResponse} from "axios";

const GRID_SIZE = 40

export function MapPage() {
    const {locationId, campaignId} = useParams();
    const {tiles} = useTiles({campaignId, locationId});
    const {creatures} = useCreatures({campaignId, locationId});
    const {modal} = useContext(ModalContext);
    const [coordinates, setCoordinates] = useState<{ x: number; y: number }[]>([]);
    const [position, setPosition] = useState<{ x: number; y: number }| null>(null);
    const [lastGridPosition, setLastGridPosition] = useState<{ x: number; y: number } >({x: 0, y: 0});

    const {movableId, movableType, move, endMove} = useContext(MoveContext)
    if (move && position === null) {
        if (movableType === MovableType.CREATURE) {
            for (let creature of creatures) {
                if (creature.id === movableId) {
                    setPosition(creature.position)
                    setLastGridPosition(creature.position)
                    console.log(creature.position)
                }
            }
        }
    }
    const handleDragMove = (x: number, y: number) => {
        if (!move) return;
        if (Math.round(x / GRID_SIZE) === 0 ) {
            x = Math.abs(x)
        } if (Math.round(y / GRID_SIZE) === 0 ) {
            y = Math.abs(y)
        }
        const gridX = Math.round(x / GRID_SIZE);
        const gridY = Math.round(y / GRID_SIZE);

        if (lastGridPosition.x !== gridX || lastGridPosition.y !== gridY) {
            setCoordinates((prev) => [...prev, {x: gridX, y: gridY}]);
            setLastGridPosition({x: gridX, y: gridY});
        }
    };


    const [validCoordinates, setValidCoordinates] = useState<{ x: number; y: number }[]>([]);
    const handleDragEnd = () => {
        async function fetchCreaturePath() {
            const response: AxiosResponse = await axios<{ x: number, y: number }[]>({
                method: "post",
                baseURL: `http://localhost:8080/game/creature/${movableId}/move`,
                data: coordinates,
            })
            setValidCoordinates(response.data);
        }
        fetchCreaturePath();
        //console.log(coordinates, validCoordinates);
    }
    if (validCoordinates.length !== 0) {
        console.log(validCoordinates);
    }
    const GRID_SIZE = 80
    return (
        <div className="relative">
            <DndContext

                onDragMove={(event) => {
                    const cordsY = event.active.rect.current.translated.top
                    const cordsX = event.active.rect.current.translated.left
                    handleDragMove(cordsX, cordsY);
                }}
                onDragEnd={() => {
                    handleDragEnd()
                    endMove()
                }}
            >
                <Tiles tiles={tiles.map((tile: ITile) => <Tile GRID_SIZE={GRID_SIZE} key={tile.id} tile={tile}/>)}/>
                <Creatures creatures={creatures.map((creature: ICreature) =>
                    <Creature
                        key={creature.id}
                        GRID_SIZE={GRID_SIZE}
                        position={(creature.id === movableId && movableType === MovableType.CREATURE) ? lastGridPosition : null}
                        path={validCoordinates}
                        creature={creature}/>)}/>
                <DroppableArea/>
                {modal && <Modal modalTitle={""}/>}
            </DndContext>
        </div>
    )
}