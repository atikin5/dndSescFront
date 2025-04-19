import {useDroppable} from "@dnd-kit/core";
import React from "react";

export const DroppableArea = () => {
    const {setNodeRef} = useDroppable({id: "droppable-area"});

    return <div ref={setNodeRef} style={{width: 300, height: 300, border: "2px dashed #ccc"}}/>;
}