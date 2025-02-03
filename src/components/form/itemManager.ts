import { IItem } from "../../models";
import { canEquipItem } from "./canEqiuipItem";

export const addItemToBackpack = (backpackItems: IItem[], items: IItem[], item: IItem) => {
    return {
        backpackItems: [...backpackItems, item],
        items: items.filter((i) => i.id !== item.id),
    };
};

export const equipItem = (equippedItems: IItem[], backpackItems: IItem[], maxItemPosition: any, item: IItem) => {
    if (canEquipItem(equippedItems, maxItemPosition, item)) {
        return {
            equippedItems: [...equippedItems, item],
            backpackItems: backpackItems.filter((i) => i.id !== item.id),
        };
    }
    throw new Error("Cannot equip item: no available slots.");
};

export const unequipItem = (backpackItems: IItem[], equippedItems: IItem[], item: IItem) => {
    return {
        backpackItems: [...backpackItems, item],
        equippedItems: equippedItems.filter((i) => i.id !== item.id),
    };
};

export const dropItem = (items: IItem[], sourceItems: IItem[], item: IItem) => {
    return {
        items: [...items, item],
        sourceItems: sourceItems.filter((i) => i.id !== item.id),
    };
};