import {useEffect, useState} from "react";
import {ITile} from "../interfaces/ITile";
import axios, {AxiosError, AxiosResponse} from "axios";

interface useTilesProps {
    campaignId: string
    locationId: string
}

export function useTiles({campaignId, locationId}: useTilesProps) {
    const [tiles, setTiles] = useState<ITile[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState('')

    async function fetchTiles() {
        try {
            setError('')
            setLoading(true)
            const response: AxiosResponse = await axios<ITile[]>({
                method: "get",
                baseURL: `http://localhost:8080/tile/location/${locationId}`,
            })
            setTiles(response.data)
            setLoading(false)
        } catch(e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchTiles()
    }, [])

    return {tiles, loading, error}
}

