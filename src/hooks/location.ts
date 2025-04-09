import {useEffect, useState} from "react";
import {ILocation} from "../interfaces/ILocation";
import axios, {AxiosError, AxiosResponse} from "axios";
import {IFullLocation} from "../interfaces/IFullLocation";

interface IProps {
    locationId: number;
}

export function useLocation({locationId}: IProps) {
    const [location, setLocation] = useState<IFullLocation>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchLocations() {
        try {
            setError('')
            setLoading(true)
            const response: AxiosResponse = await axios({
                method: "get",
                baseURL: `http://localhost:8080/location/${locationId}/full`
            })
            setLocation(response.data.content)
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

    return {location, loading, error}
}