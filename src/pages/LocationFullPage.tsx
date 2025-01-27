import {useParams} from "react-router-dom";
import {useCreatures} from "../hooks/creatures";
import {useDndCharacters} from "../hooks/dndCharacters";
import React from "react";
import {BasicTabs} from "../components/Tabs";
import {CreatureTable} from "../components/CreatureTable";
import {ICharacter, ICreature} from "../models";
import {Creature} from "../components/Creature";
import {DndCharacterTable} from "../components/DndCharacterTable";
import {DndCharacter} from "../components/DndCharacter";


export function LocationFullPage() {
    const {locationId} = useParams()
    const page: number = 0
    const size: number = 5
    const {creatures, creaturesError, creaturesLoading} = useCreatures({
        page: page,
        size: size,
        campaignId: null,
        locationId: locationId
    })

    const {characters, characterError, characterLoading} = useDndCharacters({
        page: page,
        size: size,
        campaignId: null,
        locationId: locationId
    })

    return (
        <div>
            <BasicTabs name="location" tabsBody={[
                <CreatureTable
                    creatures={creatures.map((creature: ICreature) =>
                        <Creature
                            creature={creature}
                            key={creature.id}/>)}
                />,
                <DndCharacterTable
                    dndCharacters={characters.map((character: ICharacter) =>
                        <DndCharacter
                            character={character}
                            key={character.id}/>)}
                />,

            ]}
                       tabsHead={["creatures", "characters"]}
            />
        </div>)
}