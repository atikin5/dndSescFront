import React, {useContext} from "react";
import {BasicTabs} from "../components/references/Tabs";
import {CreatureTable} from "../components/tables/CreatureTable";
import {useCreatures} from "../hooks/creatures";
import {useParams} from "react-router-dom";
import {DndCharacterTable} from "../components/tables/DndCharacterTable";
import {Creature} from "../components/tables/Creature";
import {useDndCharacters} from "../hooks/dndCharacters";
import {DndCharacter} from "../components/tables/DndCharacter";
import {LocationTable} from "../components/tables/LocationTable";
import {useLocationsPage} from "../hooks/locationsPage";
import {DndLocation} from "../components/tables/Location";
import {Loader} from "../components/references/Loader";
import {ErrorMessage} from "../components/references/ErrorMessage";
import {ModalContext} from "../context/ModalContext";
import {Modal} from "../components/references/Modal";
import {IFullLocation} from "../interfaces/IFullLocation";
import {ICreature} from "../interfaces/ICreature";
import {ICharacter} from "../interfaces/ICharacter";


export function CampaignFullPage() {
    const {campaignId} = useParams();
    const numCampaignId = Number(campaignId);
    const page: number = 0
    const size: number = 5

    const {modal, openModal, closeModal} = useContext(ModalContext)

    const {locations, locationsError, locationsLoading} = useLocationsPage({
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
                                    campaignId={numCampaignId}
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
                                    campaignId={numCampaignId}
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
                                    campaignId={numCampaignId}
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