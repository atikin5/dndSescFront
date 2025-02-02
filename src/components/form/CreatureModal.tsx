import React from "react";
import {useEffect, useState} from "react";
import CreatureForm from "./CreatureForm";
import axios, {AxiosResponse} from "axios";

interface CreatureModalProps {
    campaignId: number
    creatureId: number
}

export function CreatureModal({campaignId, creatureId}: CreatureModalProps) {
    {
        const [creature, setCreature] = useState(null);
        const [locations, setLocations] = useState([]);
        const [items, setItems] = useState([]);

        useEffect(() => {
            // Имитация асинхронного получения данных
            const fetchData = async () => {
                const creatureData = await fetchCreature(creatureId);
                const locationsData = await fetchLocations();
                const itemsData = await fetchItems();

                setCreature(creatureData);
                setLocations(locationsData);
                setItems(itemsData);
            };

            fetchData();
        }, []);

        const fetchCreature = async (creatureId: number) => {
            const response: AxiosResponse = await axios({
                method: "GET",
                baseURL: `http://localhost:8080/creature/1`
            })
            return response.data;
            // Замените на реальный API-запрос
            // return {
            //     locationId: 2,
            //     operational: true,
            //     currentHp: 50,
            //     maxHp: 100,
            //     temporaryHp: 0,
            //     armorClass: 15,
            //     size: 'MEDIUM',
            //     condition: ['BLINDED', 'CHARMED'],
            //     maxItemPosition: { handPosition: 2, fingerPosition: 2, headPosition: 1, bodyPosition: 1, footPosition: 2, cloakPosition: 1, legsPosition: 1, neckPosition: 1 },
            //     backpackItems: [],
            //     equippedItems: [],
            //     abilities: { strength: 10, dexterity: 12, constitution: 14, intelligence: 8, wisdom: 10, charisma: 12 },
            //     race: 'HUMAN',
            //     maxMovement: 30,
            //     movement: 30,
            //     macAction: 1,
            //     action: 1,
            //     maxBonusAction: 1,
            //     bonusAction: 1,
            //     proficiencyBonus: 2,
            //     skills: ['ATHLETICS', 'STEALTH'],
            // };
        };

        const fetchLocations = async () => {
            // Замените на реальный API-запрос
            return [
                { id: 1, name: 'Forest' },
                { id: 2, name: 'Cave' },
                { id: 3, name: 'Castle' },
            ];
        };

        const fetchItems = async () => {
            // Замените на реальный API-запрос
            return [
                { id: 1, name: 'Sword', itemPosition: { handPosition: 1 } },
                { id: 2, name: 'Shield', itemPosition: { handPosition: 1 } },
                { id: 3, name: 'Helmet', itemPosition: { headPosition: 1 } },
                { id: 4, name: 'Boots', itemPosition: { footPosition: 2 } },
                { id: 5, name: 'Ring of Protection', itemPosition: { fingerPosition: 1 } },
                { id: 6, name: 'Cloak of Invisibility', itemPosition: { cloakPosition: 1 } },
                { id: 7, name: 'Amulet of Health', itemPosition: { neckPosition: 1 } },
                { id: 8, name: 'Gloves of Thievery', itemPosition: { handPosition: 2 } },
                { id: 9, name: 'Bracers of Defense', itemPosition: { handPosition: 2 } },
                { id: 10, name: 'Belt of Giant Strength', itemPosition: { bodyPosition: 1 } },
            ];
        };

        if (!creature || !locations.length || !items.length) {
            return <div className="flex justify-center items-center h-screen">Loading...</div>;
        }

        return <CreatureForm creature={creature} locations={locations} items={items} />;
    };
}