import {useEffect, useState} from "react";
import {ICharactersPage, ICreature} from "../models";
import axios, {AxiosError, AxiosResponse} from "axios";

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
            const response: AxiosResponse = await axios<ICreature>({
                method: "get",
                baseURL: `http://localhost:8080/creature/${creatureId}`,
            })
            setCreature(response.data.content)
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