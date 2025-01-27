import React from "react";
import {BasicTabs} from "../components/Tabs";
import {CreatureTable} from "../components/CreatureTable";
import {useCreatures} from "../hooks/creatures";
import {useParams} from "react-router-dom";
import {DndCharacterTable} from "../components/DndCharacterTable";
import {ICharacter, ICreature, IFullLocation, ILocation} from "../models";
import {Creature} from "../components/Creature";
import {useDndCharacters} from "../hooks/dndCharacters";
import {DndCharacter} from "../components/DndCharacter";
import {LocationTable} from "../components/LocationTable";
import {useLocations} from "../hooks/locations";
import {DndLocation} from "../components/Location";


export function CampaignFullPage() {
    const {campaignId} = useParams();
    const page: number = 0
    const size: number = 5

    const {locations, locationError, locationLoading} = useLocations({
        page: page,
        size: size,
        campaignId: campaignId
    })

    const {creatures, creaturesError, creaturesLoading} = useCreatures({
        page: page,
        size: size,
        campaignId: campaignId,
        locationId: null
    })

    const {characters, characterError, characterLoading} = useDndCharacters({
        page: page,
        size: size,
        campaignId: campaignId,
        locationId: null
    })


    return (
        <div>
            <BasicTabs name="campaign" tabsBody={[
                <LocationTable
                    locations={locations.map((location: IFullLocation) =>
                        <DndLocation
                            location={location}
                            key={location.id}/>)}
                />,
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
                />]}
                       tabsHead={["locations", "creatures", "characters"]}
            />

        </div>
    )
}