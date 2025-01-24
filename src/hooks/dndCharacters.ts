import {ICampaign, ICampaignsPage, ICharacter, ICharactersPage} from "../models";
import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";

interface useCharactersProps {
    campaignId: number;
    locationId: number;
    page: number;
    size: number
}

export function useCharacters(props: useCharactersProps) {
    //TODO проверка наличия хотя бы одного id
    const [characters, setCharacters] = useState<ICharacter[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const campaignId = props.campaignId;
    const locationId = props.locationId;

    async function fetchCharacters() {
        try {
            setError('')
            setLoading(true)
            if (locationId !== null) {
                const response: AxiosResponse = await axios<ICharactersPage>({
                    method: "get",
                    baseURL: `http://localhost:8080/character/page-location/${locationId}`,
                    params: {page: props.page, size: props.size}
                })
                setCharacters(response.data.content)
            }
            else {
                const response: AxiosResponse = await axios<ICharactersPage>({
                    method: "get",
                    baseURL: `http://localhost:8080/character/page-campaign/${campaignId}`,
                    params: {page: props.page, size: props.size}
                })
                setCharacters(response.data.content)
            }
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)

        }
    }

    useEffect(() => {
        fetchCharacters()
    }, []);

    return{characters, error, loading};
}