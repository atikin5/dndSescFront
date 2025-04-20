import React, {useContext} from "react";
import {useParams} from "react-router-dom";
import {useTiles} from "../hooks/tiles";
import {useCreatures} from "../hooks/creatures";
import {ITile} from "../interfaces/ITile";
import {Tile} from "../components/map/Tile";
import {Tiles} from "../components/map/Tiles";
import {ICreature} from "../interfaces/ICreature";
import {Creatures} from "../components/map/Creatures";
import {PlayerCreature} from "../components/map/PlayerCreature";
// @ts-ignore
import {StompClient} from "../components/map/CreatureWebsocket";

export function PlayersMapPage() {
    const {locationId, campaignId} = useParams();
    const {tiles} = useTiles({campaignId, locationId});
    const {creatures} = useCreatures({campaignId, locationId});
    const {messages} = StompClient({locationId})
    console.log(messages)
    // const addItemWithDelay = async () => {
    //     for (let i = 0; i < messages[0].length; i++) {
    //         await new Promise(resolve => setTimeout(resolve, 1000));
    //         let creat = creatures[0]
    //         creat.position = messages[0][i]
    //         creatures[0] = creat
    //         console.log("creat", creat)
    //     }
    // };
    // if (messages.length !== 0) {
    //     addItemWithDelay();
    // }
    return (
            <div className="relative">
                <Tiles tiles={tiles.map((tile: ITile) => <Tile key={tile.id} tile={tile}/>)}/>
                <Creatures creatures={creatures.map((creature: ICreature) =>
                    <PlayerCreature key={creature.id} creature={creature} path={messages[0]}/>)}/>
            </div>
    )
}