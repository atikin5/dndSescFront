import React from 'react';

const AbilityInput = ({ ability, value, onChange }: { ability: string; value: number; onChange: (value: number) => void }) => {
    const handleChange = (delta: number) => {
        const newValue = Math.min(30, Math.max(8, value + delta));
        onChange(newValue);
    };

    const validateAndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const regex = /^(0|[1-9]\d*)$/; // Разрешает только натуральные числа
        if (regex.test(rawValue)) {
            const newValue = Number(rawValue);
            onChange(Math.min(30, Math.max(8, newValue))); // Ограничиваем диапазон
        }
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
                    type="text"
                    value={value}
                    onChange={validateAndChange}
                    onBlur={(e) => {
                        const newValue = Math.min(30, Math.max(8, Number(e.target.value)));
                        onChange(newValue); // Корректировка значения при потере фокуса
                    }}
                    className="w-16 text-center bg-gray-800 text-yellow-400 border border-yellow-400"
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