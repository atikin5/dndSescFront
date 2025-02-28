import React from "react";
import {Link} from "react-router-dom";
import {IFullLocation} from "../../interfaces/IFullLocation";

interface LocationProps {
    campaignId: number
    location: IFullLocation
    key: number
}

export function DndLocation({location, campaignId}: LocationProps) {
    return (
        <tr>
            <td>{location.name}</td>
            <td>{location.creatures.length}</td>
            <td>{location.dndCharacters.length}</td>
            <td>{location.destructibleObjects.length}</td>
            <td>{location.tiles.length}</td>
            <td>{location.walls.length}</td>
            <td>{location.doors.length}</td>
            <td>
                <Link to={`/campaign/${campaignId}/location/${location.id}`}>Открыть</Link>
            </td>
        </tr>
    )
}