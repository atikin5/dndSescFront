import React from "react";
import {ITile} from "../../interfaces/ITile";

interface TileProps {
    key: number;
    tile: ITile;
}

export function Tile({tile}: TileProps) {

    return (
        <>
            <div style={{
                left: (tile.position.x * 40),
                top: (tile.position.y * 40)
            }
            }
                 className="absolute bg-red-600 h-10 w-10 z-0">
            </div>
        </>
    )
}