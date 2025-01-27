import React from "react";
import {IFullLocation} from "../models";
import {Link} from "react-router-dom";

interface LocationProps {
    location: IFullLocation
    key: number
}

export function DndLocation({location}: LocationProps) {
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
                <Link to={`/location/${location.id}`}>Открыть</Link>
            </td>
        </tr>
    )
}