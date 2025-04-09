import {useParams} from "react-router-dom";
import {useLocation} from "../hooks/location";
import React from "react";

export function MapPage() {
    const {locationId, campaignId} = useParams();
    const numLocationId = Number(locationId);
    const {location, error, loading} = useLocation({locationId: numLocationId});

    return (
        <></>
    )
}