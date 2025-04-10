import {useEffect, useState} from "react";
import {ICreature} from "../interfaces/ICreature";
import axios, {AxiosError, AxiosResponse} from "axios";

interface useCreaturesProps {
    campaignId: string
    locationId: string
}

export function useCreatures({campaignId, locationId}: useCreaturesProps) {
    const [creatures, setCreatures] = useState<ICreature[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchCreatures() {
        try {
            setError('')
            setLoading(true)
            const response: AxiosResponse = await axios<ICreature>({
                method: "get",
                baseURL: `http://localhost:8080/creature/location/${locationId}`
            })
            setCreatures(response.data)
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

    return {creatures, loading, error}
}