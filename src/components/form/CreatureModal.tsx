import React from "react";
import {useEffect, useState} from "react";
import CreatureForm from "./CreatureForm";
import axios, {AxiosResponse} from "axios";
import {IItem} from "../../interfaces/IItem";

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
            const fetchData = async () => {
                const creatureData = await fetchCreature();
                const locationsData = await fetchLocations();
                const itemsData = await fetchItems();

                setCreature(creatureData);
                setLocations(locationsData);
                setItems(itemsData);
            };

            fetchData();
        }, []);

        const fetchLocations = async () => {
            const response: AxiosResponse = await axios({
                method: "GET",
                baseURL: `http://localhost:8080/location/campaign/1`,
            })
            return response.data;
        }

        const fetchItems = async () => {
            const response: AxiosResponse = await axios({
                method: "GET",
                baseURL: `http://localhost:8080/item/campaign/${campaignId}`,
            })
            // @ts-ignore
            for (const item: IItem of response.data) {
                if (item.itemPosition === null) {
                    item.itemPosition = {bodyPosition: 0};
                }
            }
            return response.data;
        }

        const fetchCreature = async () => {
            const response: AxiosResponse = await axios({
                method: "GET",
                baseURL: `http://localhost:8080/creature/54`
            })
            return response.data;
        };



        if (!creature || !locations.length || !items.length) {
            return <div className="flex justify-center items-center h-screen">Loading...</div>;
        }

        return <CreatureForm creature={creature} locations={locations} items={items} />;
    };
}