import {useParams} from "react-router-dom";
import React, {useContext} from "react";
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
import {DndContext} from "@dnd-kit/core";
import {DroppableArea} from "../components/map/MapDroppable";

export function MapPage() {
    const {locationId, campaignId} = useParams();
    const {tiles} = useTiles({campaignId, locationId});
    const {creatures} = useCreatures({campaignId, locationId});
    const {modal} = useContext(ModalContext)

    return (
        <>
            <DndContext>
                <Tiles tiles={tiles.map((tile: ITile) => <Tile key={tile.id} tile={tile}/>)}/>
                <Creatures creatures={creatures.map((creature: ICreature) => <Creature key={creature.id}
                                                                                       creature={creature}/>)}/>
                <DroppableArea/>
                {modal && <Modal modalTitle={""}/>}
            </DndContext>
        </>
    )
}