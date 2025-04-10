import {useParams} from "react-router-dom";
import React from "react";
import {Tiles} from "../components/map/Tiles";
import {ITile} from "../interfaces/ITile";
import {Tile} from "../components/map/Tile";
import {useTiles} from "../hooks/tiles";
import {Creatures} from "../components/map/Creatures";
import {ICreature} from "../interfaces/ICreature";
import {Creature} from "../components/map/Creature";
import {useCreatures} from "../hooks/creatures";

export function MapPage() {
    const {locationId, campaignId} = useParams();
    const {tiles} = useTiles({campaignId, locationId});
    const {creatures} = useCreatures({campaignId, locationId});

    return (
        <>
            <Tiles tiles={tiles.map((tile: ITile) => <Tile key={tile.id} tile={tile} />)}/>
            <Creatures creatures={creatures.map((creature: ICreature) => <Creature key={creature.id} creature={creature}/>)}/>
        </>
    )
}