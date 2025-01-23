import {ICampaign} from "../models";
import {useState} from "react";

interface useCharactersProps {
    campaignId: number;
    locationId: number;
    page: number;
    size: number
}

export function useCharacters(props: useCharactersProps) {
    const [characters, setCharacters] = useState<ICampaign[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
}