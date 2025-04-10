import React from "react";
import {ReactNode} from "react";

interface CreaturesProps {
    creatures: ReactNode
}

export function Creatures({creatures}: CreaturesProps) {
    return (
        <>
            {creatures}
        </>
    )
}