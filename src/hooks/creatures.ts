import {useEffect, useState} from "react";
import {ICharacter, ICharactersPage} from "../models";
import axios, {AxiosError, AxiosResponse} from "axios";

interface useCreaturesProps {
    campaignId: number;
    locationId: number;
    page: number;
    size: number
}

export function useCreatures(props: useCreaturesProps) {
    //TODO проверка наличия хотя бы одного id
    const [creatures, setCreatures] = useState<ICharacter[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const campaignId = props.campaignId;
    const locationId = props.locationId;

    async function fetchCreatures() {
        try {
            setError('')
            setLoading(true)
            if (locationId !== null) {
                const response: AxiosResponse = await axios<ICharactersPage>({
                    method: "get",
                    baseURL: `http://localhost:8080/creature/page-location/${locationId}`,
                    params: {page: props.page, size: props.size}
                })
                setCreatures(response.data.content)
            }
            else {
                const response: AxiosResponse = await axios<ICharactersPage>({
                    method: "get",
                    baseURL: `http://localhost:8080/creature/page-campaign/${campaignId}`,
                    params: {page: props.page, size: props.size}
                })
                setCreatures(response.data.content)
            }
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)

        }
    }

    useEffect(() => {
        fetchCreatures()
    }, []);

    return{creatures, error, loading};
}