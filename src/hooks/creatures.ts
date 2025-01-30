import {useEffect, useState} from "react";
import {ICharacter, ICharactersPage, ICreature, ICreaturesPage} from "../models";
import axios, {AxiosError, AxiosResponse} from "axios";

interface useCreaturesProps {
    campaignId: string | null
    locationId: string | null
    page: number
    size: number
}

export function useCreatures({campaignId, locationId, page, size}: useCreaturesProps) {
    //TODO проверка наличия хотя бы одного id
    const [creatures, setCreatures] = useState<ICreature[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchCreatures() {
        try {
            setError('')
            setLoading(true)
            if (locationId !== null) {
                const response: AxiosResponse = await axios<ICreaturesPage>({
                    method: "get",
                    baseURL: `http://localhost:8080/creature/page-location/${locationId}`,
                    params: {page: page, size: size}
                })
                setCreatures(response.data.content)
            }
            else {
                const response: AxiosResponse = await axios<ICreaturesPage>({
                    method: "get",
                    baseURL: `http://localhost:8080/creature/page-campaign/${campaignId}`,
                    params: {page: page, size: size}
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
    }, [])

    return{creatures, creaturesError: error, creaturesLoading: loading}
}