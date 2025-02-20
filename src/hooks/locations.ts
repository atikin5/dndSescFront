import {useEffect, useState} from "react";
import {ILocation} from "../interfaces/ILocation";
import axios, {AxiosError} from "axios";

interface IProps {
    campaignId: number
}

export function useLocations({campaignId}: IProps) {
    const [locations, setLocations] = useState<ILocation[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchLocations() {
        try {
            setError('')
            setLoading(true)
            const response = await axios({
                method: "GET",
                baseURL: `http://localhost:8080/location/campaign/${campaignId}`,
            })
        }
        catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    return {locations, loading, error}
}