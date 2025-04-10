import React from "react";
import {ReactNode} from "react";

interface TilesProps {
    tiles: ReactNode
}

export function Tiles({tiles}: TilesProps) {
    return (
        <>
            {tiles}
        </>
    )
}