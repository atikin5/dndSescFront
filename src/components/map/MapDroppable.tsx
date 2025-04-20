import {useDroppable} from "@dnd-kit/core";
import React from "react";

export const DroppableArea = () => {
    const {setNodeRef} = useDroppable({id: "droppable-area"});
    return <div ref={setNodeRef}
                style={{width: '100vw', height: '100vw'}}
    />;
}