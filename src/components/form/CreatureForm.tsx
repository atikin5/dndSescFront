import {useState} from "react";
import Select, {components , GroupBase } from "react-select"
import React from "react";
import {Condition, Race, Size, Skill} from "../../enums";
import AbilityInput from "./AbilityInput";
import ItemList from "./ItemList";
import {canEquipItem} from "./canEqiuipItem";
import {IAbilities} from "../../base";
import {ICreature, IItem, ILocation} from "../../models";

interface OptionType {
    value: string;
    label: string;
    id: number;
}


const CreatureForm = ({ creature, locations, items }: { creature: ICreature; locations: ILocation[]; items: IItem[] }) => {
    const [formData, setFormData] = useState(creature);
    const [newItems, setNewItems] = useState(items); // Новый список предметов
    const [equipError, setEquipError] = useState<string | null>(null); // Ошибка экипировки

    // Обработчик изменения локации
    const handleLocationChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            setFormData((prev) => ({ ...prev, locationId: selectedOption.id }));
        }
    };

    // Обработчик изменения общих полей
    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => {
            // Если поле вложено (например, abilities.strength)
            if (field.includes('.')) {
                const [parentField, childField] = field.split('.');
                return {
                    ...prev,
                    [parentField]: {
                        ...(prev[parentField] as Record<string, any>), // Явно приводим к объекту
                        [childField]: value,
                    },
                };
            }

            // Если поле не вложено
            return { ...prev, [field]: value };
        });
    };

    // Обработчик сохранения
    const handleSave = () => {
        console.log('Updated Creature:', formData);
    };

    // Преобразование локаций в формат, подходящий для react-select
    const locationOptions: OptionType[] = locations.map((loc) => ({
        value: loc.name,
        label: loc.name,
        id: loc.id,
    }));

    // Обработчики для предметов
    const handleAddToBackpack = (item: IItem) => {
        setFormData((prev) => ({
            ...prev,
            backpackItems: [...prev.backpackItems, item],
        }));
        setNewItems((prev) => prev.filter((i) => i.id !== item.id)); // Удаляем предмет из новых
    };

    const handleEquipItem = (item: IItem) => {
        if (canEquipItem(formData.equippedItems, formData.maxItemPosition, item)) {
            setFormData((prev) => ({
                ...prev,
                equippedItems: [...prev.equippedItems, item],
                backpackItems: prev.backpackItems.filter((i) => i.id !== item.id),
            }));
            setEquipError(null); // Сбрасываем ошибку
        } else {
            setEquipError(`Cannot equip "${item.name}". Not enough slots.`);
        }
    };

    const handleUnequipItem = (item: IItem) => {
        setFormData((prev) => ({
            ...prev,
            equippedItems: prev.equippedItems.filter((i) => i.id !== item.id),
            backpackItems: [...prev.backpackItems, item],
        }));
        setEquipError(null); // Сбрасываем ошибку
    };

    const handleDropItem = (item: IItem) => {
        setFormData((prev) => ({
            ...prev,
            backpackItems: prev.backpackItems.filter((i) => i.id !== item.id),
        }));
        setNewItems((prev) => [...prev, item]); // Возвращаем предмет в новые
        setEquipError(null); // Сбрасываем ошибку
    };

    return (
        <div className="bg-[#0e0e14] text-yellow-400 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Creature</h1>

            {/* Error Message */}
            {equipError && (
                <div className="bg-red-800 text-white p-2 rounded mb-4">{equipError}</div>
            )}

            {/* Location Dropdown */}
            <div className="mb-4">
                <label className="block mb-2 text-yellow-400">Location</label>
                <Select<OptionType, false, GroupBase<OptionType>>
                    options={locationOptions}
                    defaultValue={locationOptions.find((loc) => loc.id === creature.locationId)}
                    onChange={handleLocationChange}
                    styles={{
                        control: (base) => ({ ...base, backgroundColor: '#1f2937', borderColor: 'yellow' }),
                        menu: (base) => ({ ...base, backgroundColor: '#1f2937', color: 'yellow' }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? 'yellow' : '#1f2937',
                            color: state.isSelected ? 'black' : 'yellow',
                        }),
                        singleValue: (base) => ({ ...base, color: 'yellow' }), // Желтый текст для выбранного значения
                    }}
                    components={{
                        IndicatorSeparator: () => null, // Убираем разделитель
                    }}
                />
            </div>

            {/* General Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block mb-2">Operational</label>
                    <input
                        type="checkbox"
                        checked={formData.operational}
                        onChange={(e) => handleInputChange('operational', e.target.checked)}
                        className="w-4 h-4"
                    />
                </div>
                <div>
                    <label className="block mb-2">Current HP</label>
                    <input
                        type="number"
                        value={formData.currentHp}
                        onChange={(e) => handleInputChange('currentHp', Number(e.target.value))}
                        className="w-full bg-gray-800 text-yellow-400 border border-yellow-400 px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block mb-2">Max HP</label>
                    <input
                        type="number"
                        value={formData.maxHp}
                        onChange={(e) => handleInputChange('maxHp', Number(e.target.value))}
                        className="w-full bg-gray-800 text-yellow-400 border border-yellow-400 px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block mb-2">Temporary HP</label>
                    <input
                        type="number"
                        value={formData.temporaryHp}
                        onChange={(e) => handleInputChange('temporaryHp', Number(e.target.value))}
                        className="w-full bg-gray-800 text-yellow-400 border border-yellow-400 px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block mb-2">Armor Class</label>
                    <input
                        type="number"
                        value={formData.armorClass}
                        onChange={(e) => handleInputChange('armorClass', Number(e.target.value))}
                        className="w-full bg-gray-800 text-yellow-400 border border-yellow-400 px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block mb-2">Size</label>
                    <select
                        value={formData.size}
                        onChange={(e) => handleInputChange('size', e.target.value)}
                        className="w-full bg-gray-800 text-yellow-400 border border-yellow-400 px-2 py-1"
                    >
                        {Object.values(Size).map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Race</label>
                    <select
                        value={formData.race}
                        onChange={(e) => handleInputChange('race', e.target.value)}
                        className="w-full bg-gray-800 text-yellow-400 border border-yellow-400 px-2 py-1"
                    >
                        {Object.values(Race).map((race) => (
                            <option key={race} value={race}>
                                {race}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Conditions */}
            <div className="mb-4">
                <label className="block mb-2">Conditions</label>
                <select
                    multiple
                    value={formData.condition}
                    onChange={(e) =>
                        handleInputChange(
                            'condition',
                            Array.from(e.target.selectedOptions, (option) => option.value)
                        )
                    }
                    className="w-full bg-gray-800 text-yellow-400 border border-yellow-400 px-2 py-1"
                    style={{ scrollbarColor: 'yellow black' }}
                >
                    {Object.values(Condition).map((condition) => (
                        <option key={condition} value={condition} className="bg-gray-800 text-yellow-400">
                            {condition}
                        </option>
                    ))}
                </select>
            </div>

            {/* Skills */}
            <div className="mb-4">
                <label className="block mb-2">Skills</label>
                <select
                    multiple
                    value={formData.skills}
                    onChange={(e) =>
                        handleInputChange(
                            'skills',
                            Array.from(e.target.selectedOptions, (option) => option.value)
                        )
                    }
                    className="w-full bg-gray-800 text-yellow-400 border border-yellow-400 px-2 py-1"
                    style={{ scrollbarColor: 'yellow black' }}
                >
                    {Object.values(Skill).map((skill) => (
                        <option key={skill} value={skill} className="bg-gray-800 text-yellow-400">
                            {skill}
                        </option>
                    ))}
                </select>
            </div>

            {/* Abilities */}
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Abilities</h2>
                <div className="grid grid-cols-3 gap-4">
                    {Object.keys(formData.abilities).map((ability) => (
                        <AbilityInput
                            key={ability}
                            ability={ability}
                            value={formData.abilities[ability as keyof IAbilities]}
                            onChange={(value) => handleInputChange(`abilities.${ability}`, value)}
                        />
                    ))}
                </div>
            </div>

            {/* Items */}
            <ItemList
                backpackItems={formData.backpackItems}
                equippedItems={formData.equippedItems}
                newItems={newItems}
                onAddToBackpack={handleAddToBackpack}
                onEquipItem={handleEquipItem}
                onUnequipItem={handleUnequipItem}
                onDropItem={handleDropItem}
            />

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            >
                Save
            </button>
        </div>
    );
};

export default CreatureForm;