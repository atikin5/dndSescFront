import {useEffect, useState} from "react";
import axios, {AxiosError, AxiosResponse} from 'axios'
import {ICampaign} from "../interfaces/ICampaign";
import {ICampaignsPage} from "../interfaces/ICampaignPage";

interface useCampaignsProps {
    page: number
    size: number
}

export function useCampaigns({page, size}: useCampaignsProps) {
    const [campaigns, setCampaigns] = useState<ICampaign[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchCampaigns() {
        try {
            setError('')
            setLoading(true)
            const response: AxiosResponse = await axios<ICampaignsPage>({
                method: "get",
                baseURL: `http://localhost:8080/campaign/page`,
                params: {page: page, size: size}
            })
            setCampaigns(response.data.content)
            setLoading(false)
        } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchCampaigns()
    }, [])

    return{campaigns, error, loading}
}