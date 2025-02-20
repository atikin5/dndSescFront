import React from 'react';
import {IItem} from "../../interfaces/IItem";



const ItemList = ({
                      title,
                      items,
                      onItemClick,
                      onDrop,
                      buttonText,
                      showDrop = false,
                      containerStyle = "bg-gray-800", // Дефолтный стиль
                  }: {
    title: string;
    items: IItem[];
    onItemClick: (item: IItem) => void;
    onDrop?: (item: IItem) => void;
    buttonText: string;
    showDrop?: boolean;
    containerStyle?: string; // Стиль контейнера
}) => {
    return (
        <div className={`flex-1 ${containerStyle} rounded-lg p-2`}>
            <h3 className="font-bold text-center mb-2">{title}</h3>
            <ul className="max-h-40 overflow-y-auto" style={{ scrollbarColor: 'yellow black' }}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center bg-gray-800 text-yellow-400 p-1 rounded">
                            <span>{item.type}</span>
                            <div>
                                <button
                                    onClick={() => onItemClick(item)}
                                    className="bg-yellow-400 text-black px-2 py-1 rounded mr-2"
                                >
                                    {buttonText}
                                </button>
                                {showDrop && (
                                    <button
                                        onClick={() => onDrop?.(item)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Drop
                                    </button>
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-400 italic">No items</li>
                )}
            </ul>
        </div>
    );
};

export default ItemList;