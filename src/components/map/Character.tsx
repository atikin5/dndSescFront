import React from "react";
import {ICharacter} from "../../interfaces/ICharacter";

interface CharacterProps {
    character: ICharacter
}

export function Character({character}: CharacterProps) {
    return (
        <div className="character">

        </div>
    )
}