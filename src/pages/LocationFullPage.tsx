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
import {Loader} from "../components/Loader";
import {ErrorMessage} from "../components/ErrorMessage";

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

    const {characters, charactersError, charactersLoading} = useDndCharacters({
        page: page,
        size: size,
        campaignId: null,
        locationId: locationId
    })

    return (
        <div>
            <BasicTabs name="location" tabsBody={[
                <>
                    {creaturesLoading && <Loader/>}
                    {creaturesError && <ErrorMessage error={creaturesError}/>}
                    {
                        !creaturesLoading &&
                        !creaturesError &&
                        <CreatureTable
                            creatures={creatures.map((creature: ICreature) =>
                                <Creature
                                    creature={creature}
                                    key={creature.id}
                                    location={false}/>)}
                            location={false}/>
                    }
                </>,
                <>
                    {charactersLoading && <Loader/>}
                    {charactersError && <ErrorMessage error={charactersError}/>}
                    {
                        !charactersLoading &&
                        !charactersError &&
                        <DndCharacterTable
                            dndCharacters={characters.map((character: ICharacter) =>
                                <DndCharacter
                                    character={character}
                                    key={character.id}
                                    location={false}/>)}
                            location={false}/>
                    }
                </>,
            ]}
                       tabsHead={["creatures", "characters"]}
            />
        </div>)
}