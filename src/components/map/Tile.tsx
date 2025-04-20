import React from "react";
import {ITile} from "../../interfaces/ITile";
// @ts-ignore
import stone1 from "../../icons/tiles/stone1.jpg"
// @ts-ignore
import sand2 from "../../icons/tiles/sand2.jpg"
// @ts-ignore
import sand1 from "../../icons/tiles/sand1.jpg"


interface TileProps {
    key: number;
    tile: ITile;
    GRID_SIZE: number;
}

export function Tile({tile, GRID_SIZE}: TileProps) {
    let img;
    if (tile.type === "stone1") {
        img = stone1;
    } else if (tile.type === "sand1") {
        img = sand1;
    } else if (tile.type === "sand2") {
        img = sand2;
    }

    return (
        <>
            <div style={{
                height: GRID_SIZE,
                width: GRID_SIZE,
                left: (tile.position.x * GRID_SIZE),
                top: (tile.position.y * GRID_SIZE),
                backgroundImage: `url(${img})`
            }
            }
                 className="absolute  z-0">
            </div>
        </>
    )
}