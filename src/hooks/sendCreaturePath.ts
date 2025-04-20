import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";

interface useSendCreaturePathProps {
    id: string;
    path: { x: number; y: number }[]
}

export function useSendCreaturePath({ id, path }: useSendCreaturePathProps) {
    const [fetchingPath, setFetchingPath] = useState<{x: number, y: number}[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    async function fetchCreaturePath() {
        try {
            setError('')
            setLoading(true)
            const response: AxiosResponse = await axios<{x: number, y: number}[]>({
                method: "post",
                baseURL: `http://localhost:8080/game/creature/${id}/move`,
                data: path
            })
            setFetchingPath(response.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchCreaturePath()
    }, [])

    return {fetchingPath, loading, error}
}