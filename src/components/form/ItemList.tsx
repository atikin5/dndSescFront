import React from 'react';
import {IItem} from "../../models";

const ItemList = ({
                      backpackItems,
                      equippedItems,
                      newItems,
                      onAddToBackpack,
                      onEquipItem,
                      onUnequipItem,
                      onDropItem,
                  }: {
    backpackItems: IItem[];
    equippedItems: IItem[];
    newItems: IItem[];
    onAddToBackpack: (item: IItem) => void;
    onEquipItem: (item: IItem) => void;
    onUnequipItem: (item: IItem) => void;
    onDropItem: (item: IItem) => void;
}) => {
    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Items</h2>

            {/* New Items */}
            <div className="mb-2">
                <h3 className="font-bold">New Items</h3>
                <ul className="max-h-32 overflow-y-auto" style={{ scrollbarColor: 'yellow black' }}>
                    {newItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center bg-gray-800 text-yellow-400 p-1">
                            <span>{item.name}</span>
                            <button
                                onClick={() => onAddToBackpack(item)}
                                className="bg-yellow-400 text-black px-2 py-1 rounded"
                            >
                                Add to Backpack
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Backpack Items */}
            <div className="mb-2">
                <h3 className="font-bold">Backpack</h3>
                <ul className="max-h-32 overflow-y-auto" style={{ scrollbarColor: 'yellow black' }}>
                    {backpackItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center bg-gray-800 text-yellow-400 p-1">
                            <span>{item.name}</span>
                            <div>
                                <button
                                    onClick={() => onEquipItem(item)}
                                    className="bg-yellow-400 text-black px-2 py-1 rounded mr-2"
                                >
                                    Equip
                                </button>
                                <button
                                    onClick={() => onDropItem(item)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Drop
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Equipped Items */}
            <div>
                <h3 className="font-bold">Equipped</h3>
                <ul className="max-h-32 overflow-y-auto" style={{ scrollbarColor: 'yellow black' }}>
                    {equippedItems.map((item) => (
                        <li key={item.id} className="flex justify-between items-center bg-gray-800 text-yellow-400 p-1">
                            <span>{item.name}</span>
                            <button
                                onClick={() => onUnequipItem(item)}
                                className="bg-yellow-400 text-black px-2 py-1 rounded"
                            >
                                Unequip
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ItemList;