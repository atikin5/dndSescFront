import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";
import {ICreature} from "../interfaces/ICreature";

interface useCreatureProps {
    creatureId: number
}

export function useCreature({creatureId}: useCreatureProps) {
    const [creature, setCreature] = useState<ICreature>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchCreature() {
        try {
            setError('')
            setLoading(true)
            const response: AxiosResponse = await axios({
                method: "get",
                baseURL: `http://localhost:8080/creature/${creatureId}`,
            })
            setCreature(response.data)
            console.log(response.data)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchCreature()
    }, [])

    return{creature, creatureError: error, creatureLoading: loading}
}