import {IFullLocation, ILocation} from "../models";
import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from "axios";

interface useLocationProps {
    campaignId: string
    page: number
    size: number
}

export function useLocations({campaignId, page, size}: useLocationProps) {
    const [locations, setLocations] = useState<IFullLocation[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchLocations() {
        try {
            setError('')
            setLoading(true)
            const response: AxiosResponse = await axios<IFullLocation[]>({
                method: "get",
                baseURL: `http://localhost:8080/location/page`,
                params: {campaignId: campaignId, page: page, size: size}
            })
            setLocations(response.data.content)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchLocations()
    }, [])

    return {locations, locationError: error, locationLoading: loading}
}