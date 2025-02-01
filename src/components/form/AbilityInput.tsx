import React from 'react';

const AbilityInput = ({ ability, value, onChange }: { ability: string; value: number; onChange: (value: number) => void }) => {
    const handleChange = (delta: number) => {
        const newValue = Math.min(30, Math.max(8, value + delta));
        onChange(newValue);
    };

    return (
        <div className="flex flex-col items-center">
            <span className="text-sm">{ability.toUpperCase()}</span>
            <div className="flex items-center mt-1">
                <button
                    onClick={() => handleChange(-1)}
                    className="bg-yellow-400 text-black w-6 h-6 rounded-l"
                >
                    -
                </button>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    onBlur={(e) => onChange(Math.min(30, Math.max(8, Number(e.target.value))))} // Корректировка значения при потере фокуса
                    className="w-16 text-center bg-gray-800 text-yellow-400 border border-yellow-400"
                    min="8"
                    max="30"
                />
                <button
                    onClick={() => handleChange(1)}
                    className="bg-yellow-400 text-black w-6 h-6 rounded-r"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default AbilityInput;