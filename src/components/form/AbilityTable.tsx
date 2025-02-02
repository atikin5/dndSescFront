import React from 'react';
import {IAbilities} from "../../base";
import {validateNumber} from "./numberValidation";

const AbilityTable = ({ abilities, onChange }: { abilities: IAbilities; onChange: (ability: string, value: number) => void }) => {
    const handleIncrement = (ability: string) => {
        onChange(ability, Math.min(30, abilities[ability as keyof IAbilities] + 1));
    };

    const handleDecrement = (ability: string) => {
        onChange(ability, Math.max(8, abilities[ability as keyof IAbilities] - 1));
    };

    return (
        <div className="bg-gray-800 rounded-lg p-2 flex-1">
            <h3 className="font-bold text-center mb-2">Abilities</h3>
            <table className="w-full">
                <tbody>
                {Object.keys(abilities).map((ability) => (
                    <tr key={ability} className="flex justify-between items-center mb-1">
                        <td className="w-1/2 text-left">{ability.toUpperCase()}</td>
                        <td className="w-1/2 flex items-center">
                            <button
                                onClick={() => handleDecrement(ability)}
                                className="bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-l"
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={abilities[ability as keyof IAbilities]}
                                onChange={(e) => {
                                    const rawValue = e.target.value;
                                    if (/^\d*$/.test(rawValue)) {
                                        onChange(ability, rawValue === '' ? null : parseInt(rawValue, 10));
                                    }
                                }}
                                onBlur={(e) => {
                                    const validatedValue = Math.min(30, Math.max(8, parseInt(e.target.value, 10)));
                                    onChange(ability, validatedValue);
                                }}
                                className="w-12 text-center bg-gray-700 text-yellow-400 border-none focus:outline-none h-8"
                            />
                            <button
                                onClick={() => handleIncrement(ability)}
                                className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-r"
                            >
                                +
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AbilityTable;