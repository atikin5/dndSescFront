import React from 'react';

const ConditionSkillList = ({
                                title,
                                allItems,
                                selectedItems,
                                onAdd,
                                onRemove,
                            }: {
    title: string;
    allItems: string[];
    selectedItems: string[];
    onAdd: (item: string) => void;
    onRemove: (item: string) => void;
}) => {
    return (
        <div className="flex-1 bg-gray-800 rounded-lg p-2">
            <h3 className="font-bold text-center mb-2">{title}</h3>
            <ul className="max-h-60 overflow-y-auto" style={{ scrollbarColor: 'yellow black' }}>
                {allItems.map((item) => (
                    <li key={item} className="flex justify-between items-center mb-1">
                        <span className="w-3/4">{item}</span>
                        <div className="w-1/4 flex justify-end">
                            {selectedItems.includes(item) ? (
                                <button
                                    onClick={() => onRemove(item)}
                                    className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded"
                                >
                                    -
                                </button>
                            ) : (
                                <button
                                    onClick={() => onAdd(item)}
                                    className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded"
                                >
                                    +
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConditionSkillList;