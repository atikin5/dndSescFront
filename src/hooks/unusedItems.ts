import {useEffect, useState} from "react";
import {IItem} from "../interfaces/IItem";
import axios, {AxiosError, AxiosResponse} from "axios";

interface IProps {
    campaignId: number | null
    locationId: number | null
}

export function useUnusedItems({campaignId, locationId}: IProps) {

    const [unusedItems, setUnusedItems] = useState<IItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchItems() {
        try {
            setError('');
            setLoading(true);
            if (campaignId !== null) {
                const response: AxiosResponse = await axios({
                    method: "GET",
                    baseURL: `https://localhost:8000/item/unused/campaign/${campaignId}`,
                })
                setUnusedItems(response.data);
            }
            else {
                const response: AxiosResponse = await axios({
                    method: "GET",
                    baseURL: `https://localhost:8000/item/unused/location/${locationId}`,
                })
                setUnusedItems(response.data);
            }
            setLoading(false);

        }
        catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchItems();
    }, [])

    return {unusedItems, loading, error};
}