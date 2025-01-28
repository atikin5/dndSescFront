import {ICampaign, ICampaignsPage, ICharacter, ICharactersPage} from "../models";
import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";

interface useDndCharactersProps {
    campaignId: string
    locationId: string
    page: number
    size: number
}

export function useDndCharacters({campaignId, locationId, page, size}: useDndCharactersProps) {
    //TODO проверка наличия хотя бы одного id
    const [characters, setCharacters] = useState<ICharacter[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    async function fetchDndCharacters() {
        try {
            setError('')
            setLoading(true)
            if (locationId !== null) {
                const response: AxiosResponse = await axios<ICharactersPage>({
                    method: "get",
                    baseURL: `http://localhost:8080/character/page-location/${locationId}`,
                    params: {page: page, size: size}
                })
                setCharacters(response.data.content)
            }
            else {
                const response: AxiosResponse = await axios<ICharactersPage>({
                    method: "get",
                    baseURL: `http://localhost:8080/character/page-campaign/${campaignId}`,
                    params: {page: page, size: size}
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
        fetchDndCharacters()
    }, [])

    return{characters, charactersError: error, charactersLoading: loading}
}