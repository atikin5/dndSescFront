import React, {useContext} from "react";
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
import {Loader} from "../components/Loader";
import {ErrorMessage} from "../components/ErrorMessage";
import {ModalContext} from "../context/ModalContext";
import {Modal} from "../components/Modal";


export function CampaignFullPage() {
    const {campaignId} = useParams();
    const page: number = 0
    const size: number = 5

    const {modal, openModal, closeModal} = useContext(ModalContext)

    const {locations, locationsError, locationsLoading} = useLocations({
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

    const {characters, charactersError, charactersLoading} = useDndCharacters({
        page: page,
        size: size,
        campaignId: campaignId,
        locationId: null
    })


    return (
        <div className="select-none">
            <BasicTabs name="campaign" tabsBody={[
                <>
                    {locationsLoading && <Loader/>}
                    {locationsError && <ErrorMessage error={locationsError}/>}
                    {
                        !locationsError &&
                        !locationsLoading &&
                        <LocationTable
                            locations={locations.map((location: IFullLocation) =>
                                <DndLocation
                                    location={location}
                                    key={location.id}/>)}/>
                    }
                </>,
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
                                    location={true}/>)}
                            location={true}/>
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
                                    location={true}/>)}
                            location={true}/>
                    }
                </>
            ]}
                       tabsHead={["locations", "creatures", "characters"]}
            />
            {modal && <Modal modalTitle={""}/>}
        </div>
    )
}