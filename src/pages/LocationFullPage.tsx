import {Link, useParams} from "react-router-dom";
import {useCreatures} from "../hooks/creatures";
import {useDndCharacters} from "../hooks/dndCharacters";
import React, {useContext} from "react";
import {BasicTabs} from "../components/references/Tabs";
import {CreatureTable} from "../components/tables/CreatureTable";
import {Creature} from "../components/tables/Creature";
import {DndCharacterTable} from "../components/tables/DndCharacterTable";
import {DndCharacter} from "../components/tables/DndCharacter";
import {Loader} from "../components/references/Loader";
import {ErrorMessage} from "../components/references/ErrorMessage";
import {Modal} from "../components/references/Modal";
import {ModalContext} from "../context/ModalContext";
import {ICharacter} from "../interfaces/ICharacter";
import {ICreature} from "../interfaces/ICreature";

export function LocationFullPage() {
    const {locationId, campaignId} = useParams()
    const numCampaignId = Number(campaignId);
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

    const {modal, modalType} = useContext(ModalContext)

    return (
        <div className="select-none z-0">
            <BasicTabs name="location" tabsBody={[
                <>
                    <div>
                        <Link to={`/campaign/${campaignId}/open-location/${locationId}`}>Перейти</Link>
                    </div>
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
                                    campaignId={numCampaignId}
                                    key={character.id}
                                    location={false}/>)}
                            location={false}/>
                    }
                </>,
            ]}
                       tabsHead={["start", "creatures", "characters"]}
            />
            {modal && <Modal modalTitle={""}/>}
        </div>)
}