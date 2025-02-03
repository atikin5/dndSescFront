import Select, { GroupBase } from "react-select"
import React from "react";
import ItemList from "./ItemList";
import ConditionSkillList from "./ConditionSkillList";
import AbilityTable from "./AbilityTable";
import {CreatureFormSchema} from "./CreatureFormSchema";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Size} from "../../enums/Size";
import {Race} from "../../enums/Race";
import {Skill} from "../../enums/Skill";
import {ICreature} from "../../interfaces/ICreature";
import {IItem} from "../../interfaces/IItem";
import {ILocation} from "../../interfaces/ILocation";
import {Condition} from "../../enums/Condition";

interface OptionType {
    value: string;
    label: string;
    id: number;
}

const CreatureForm = ({ creature, locations, items }: { creature: ICreature; locations: ILocation[]; items: IItem[] }) => {
    const locationOptions: OptionType[] = locations.map((loc) => ({
        value: loc.name,
        label: loc.name,
        id: loc.id,
    }));

    // Состояние для ошибки
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    // Функция для показа ошибки
    const showError = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 2000);
    };

    // Функция проверки itemPosition
    const validateItemPositions = (
        creature: ICreature,
        equippedItems: IItem[],
        newItem: IItem
    ): string | null => {
        const currentEquippedSum = equippedItems.reduce(
            (acc, item) => {
                acc.handPosition += item.itemPosition.handPosition || 0;
                acc.fingerPosition += item.itemPosition.fingerPosition || 0;
                acc.headPosition += item.itemPosition.headPosition || 0;
                acc.bodyPosition += item.itemPosition.bodyPosition || 0;
                acc.footPosition += item.itemPosition.footPosition || 0;
                acc.cloakPosition += item.itemPosition.cloakPosition || 0;
                acc.legsPosition += item.itemPosition.legsPosition || 0;
                acc.neckPosition += item.itemPosition.neckPosition || 0;
                return acc;
            },
            {
                handPosition: 0,
                fingerPosition: 0,
                headPosition: 0,
                bodyPosition: 0,
                footPosition: 0,
                cloakPosition: 0,
                legsPosition: 0,
                neckPosition: 0,
            }
        );

        const newEquippedSum = {
            handPosition: currentEquippedSum.handPosition + (newItem.itemPosition.handPosition || 0),
            fingerPosition: currentEquippedSum.fingerPosition + (newItem.itemPosition.fingerPosition || 0),
            headPosition: currentEquippedSum.headPosition + (newItem.itemPosition.headPosition || 0),
            bodyPosition: currentEquippedSum.bodyPosition + (newItem.itemPosition.bodyPosition || 0),
            footPosition: currentEquippedSum.footPosition + (newItem.itemPosition.footPosition || 0),
            cloakPosition: currentEquippedSum.cloakPosition + (newItem.itemPosition.cloakPosition || 0),
            legsPosition: currentEquippedSum.legsPosition + (newItem.itemPosition.legsPosition || 0),
            neckPosition: currentEquippedSum.neckPosition + (newItem.itemPosition.neckPosition || 0),
        };

        const maxItemPosition = creature.maxItemPosition;

        if (newEquippedSum.handPosition > maxItemPosition.handPosition) {
            return "Not enough hand position to equip this item.";
        }
        if (newEquippedSum.fingerPosition > maxItemPosition.fingerPosition) {
            return "Not enough finger position to equip this item.";
        }
        if (newEquippedSum.headPosition > maxItemPosition.headPosition) {
            return "Not enough head position to equip this item.";
        }
        if (newEquippedSum.bodyPosition > maxItemPosition.bodyPosition) {
            return "Not enough body position to equip this item.";
        }
        if (newEquippedSum.footPosition > maxItemPosition.footPosition) {
            return "Not enough foot position to equip this item.";
        }
        if (newEquippedSum.cloakPosition > maxItemPosition.cloakPosition) {
            return "Not enough cloak position to equip this item.";
        }
        if (newEquippedSum.legsPosition > maxItemPosition.legsPosition) {
            return "Not enough legs position to equip this item.";
        }
        if (newEquippedSum.neckPosition > maxItemPosition.neckPosition) {
            return "Not enough neck position to equip this item.";
        }

        return null;
    };

    return (
        <div className="bg-[#0e0e14] text-yellow-400 p-6 rounded-lg shadow-lg max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Creature</h1>
            {errorMessage && (
                <div className="text-red-500 bg-red-900 p-2 rounded mb-4">
                    {errorMessage}
                </div>
            )}

            <Formik
                initialValues={{
                    operational: creature.operational,
                    currentHp: creature.currentHp || 0 || '',
                    maxHp: creature.maxHp || 0 || '',
                    temporaryHp: creature.temporaryHp || 0 || '',
                    armorClass: creature.armorClass || 0 || '',
                    abilities: creature.abilities,
                    condition: creature.condition || [],
                    skills: creature.skills || [],
                    size: creature.size,
                    race: creature.race,
                    backpackItems: creature.backpackItems,
                    equippedItems: creature.equippedItems,
                    items: items, // Изначально передаем все предметы
                }}
                validationSchema={CreatureFormSchema}
                onSubmit={(values) => {
                    console.log('Updated Creature:', values);
                }}
            >
                {({ values, setFieldValue }) => {
                    // Первоначальная фильтрация New Items


                    return (
                        <Form>
                            {/* Error Message */}
                            <ErrorMessage name="currentHp" component="div" className="text-red-500" />
                            <ErrorMessage name="maxHp" component="div" className="text-red-500" />
                            <ErrorMessage name="temporaryHp" component="div" className="text-red-500" />
                            <ErrorMessage name="armorClass" component="div" className="text-red-500" />

                            {/* Location Dropdown */}
                            <div className="mb-4">
                                <label className="block mb-2 text-yellow-400">Location</label>
                                <Select<OptionType, false, GroupBase<OptionType>>
                                    options={locationOptions}
                                    defaultValue={locationOptions.find((loc) => loc.id === creature.locationId)}
                                    onChange={(selectedOption) => {
                                        if (selectedOption) {
                                            setFieldValue('locationId', selectedOption.id);
                                        }
                                    }}
                                    styles={{
                                        control: (base) => ({ ...base, backgroundColor: '#1f2937', borderColor: 'yellow' }),
                                        menu: (base) => ({ ...base, backgroundColor: '#1f2937', color: 'yellow' }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isSelected ? 'yellow' : '#1f2937',
                                            color: state.isSelected ? 'black' : 'yellow',
                                        }),
                                        singleValue: (base) => ({ ...base, color: 'yellow' }),
                                    }}
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                />
                            </div>

                            {/* Numerical Fields */}
                            <div className="flex gap-4 mb-4 bg-gray-800 p-2 rounded-lg">
                                <div className="flex flex-col items-center">
                                    <label className="block mb-1">Current HP</label>
                                    <Field
                                        type="text"
                                        name="currentHp"
                                        className="w-20 text-center bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onBlur={() => {
                                            if (values.currentHp === null || values.currentHp === '') {
                                                setFieldValue('currentHp', 0);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="block mb-1">Max HP</label>
                                    <Field
                                        type="text"
                                        name="maxHp"
                                        className="w-20 text-center bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onBlur={() => {
                                            if (values.maxHp === null || values.maxHp === '') {
                                                setFieldValue('maxHp', 0);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="block mb-1">Temporary HP</label>
                                    <Field
                                        type="text"
                                        name="temporaryHp"
                                        className="w-20 text-center bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onBlur={() => {
                                            if (values.temporaryHp === null || values.temporaryHp === '') {
                                                setFieldValue('temporaryHp', 0);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="block mb-1">Armor Class</label>
                                    <Field
                                        type="text"
                                        name="armorClass"
                                        className="w-20 text-center bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onBlur={() => {
                                            if (values.armorClass === null || values.armorClass === '') {
                                                setFieldValue('armorClass', 0);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Size and Race */}
                            <div className="flex gap-4 mb-4 bg-gray-800 p-2 rounded-lg">
                                <div className="flex flex-col items-center flex-1">
                                    <label className="block mb-1">Size</label>
                                    <Field
                                        as="select"
                                        name="size"
                                        className="w-full bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                    >
                                        {Object.values(Size).map((size) => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="flex flex-col items-center flex-1">
                                    <label className="block mb-1">Race</label>
                                    <Field
                                        as="select"
                                        name="race"
                                        className="w-full bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                    >
                                        {Object.values(Race).map((race) => (
                                            <option key={race} value={race}>
                                                {race}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                            </div>

                            {/* Abilities, Conditions, and Skills */}
                            <div className="flex gap-4 mb-4">
                                {/* Abilities */}
                                <AbilityTable
                                    abilities={values.abilities}
                                    onChange={(ability, value) => {
                                        setFieldValue(`abilities.${ability}`, value);
                                    }}
                                />

                                {/* Conditions and Skills */}
                                <div className="flex-1 flex gap-4">
                                    <ConditionSkillList
                                        title="Conditions"
                                        allItems={Object.values(Condition)}
                                        selectedItems={values.condition}
                                        onAdd={(item) => {
                                            setFieldValue('condition', [...values.condition, item]);
                                        }}
                                        onRemove={(item) => {
                                            setFieldValue(
                                                'condition',
                                                values.condition.filter((i) => i !== item)
                                            );
                                        }}
                                    />
                                    <ConditionSkillList
                                        title="Skills"
                                        allItems={Object.values(Skill)}
                                        selectedItems={values.skills}
                                        onAdd={(item) => {
                                            setFieldValue('skills', [...values.skills, item]);
                                        }}
                                        onRemove={(item) => {
                                            setFieldValue(
                                                'skills',
                                                values.skills.filter((i) => i !== item)
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Items */}
                            <div className="flex gap-4 mb-4">
                                {/* New Items */}
                                <ItemList
                                    title="New Items"
                                    items={values.items} // Используем отфильтрованный список
                                    onItemClick={(item) => {
                                        if (!values.backpackItems.some((i) => i.id === item.id)) {
                                            setFieldValue('backpackItems', [...values.backpackItems, item]);
                                            setFieldValue(
                                                'items',
                                                values.items.filter((i) => i.id !== item.id) // Удаляем предмет из New Items
                                            );
                                        }
                                    }}
                                    buttonText="Add to Backpack"
                                    containerStyle="bg-gray-800"
                                />

                                {/* Backpack Items */}
                                <ItemList
                                    title="Backpack Items"
                                    items={values.backpackItems}
                                    onItemClick={(item) => {
                                        // Проверяем, можно ли надеть предмет
                                        const validationError = validateItemPositions(creature, values.equippedItems, item);
                                        if (validationError) {
                                            showError(validationError); // Показываем ошибку
                                            return; // Запрещаем надевать предмет
                                        }

                                        // Если проверка прошла, добавляем предмет в equippedItems
                                        if (!values.equippedItems.some((i) => i.id === item.id)) {
                                            setFieldValue('equippedItems', [...values.equippedItems, item]);
                                            setFieldValue(
                                                'backpackItems',
                                                values.backpackItems.filter((i) => i.id !== item.id)
                                            );
                                        }
                                    }}
                                    onDrop={(item) => {
                                        setFieldValue(
                                            'backpackItems',
                                            values.backpackItems.filter((i) => i.id !== item.id)
                                        );
                                        setFieldValue('items', [...values.items, item]);
                                    }}
                                    buttonText="Equip"
                                    showDrop
                                    containerStyle="bg-gray-700"
                                />

                                {/* Equipped Items */}
                                <ItemList
                                    title="Equipped Items"
                                    items={values.equippedItems}
                                    onItemClick={(item) => {
                                        if (!values.backpackItems.some((i) => i.id === item.id)) {
                                            setFieldValue('backpackItems', [...values.backpackItems, item]);
                                            setFieldValue(
                                                'equippedItems',
                                                values.equippedItems.filter((i) => i.id !== item.id)
                                            );
                                        }
                                    }}
                                    onDrop={(item) => {
                                        setFieldValue(
                                            'equippedItems',
                                            values.equippedItems.filter((i) => i.id !== item.id)
                                        );
                                        setFieldValue('items', [...values.items, item]);
                                    }}
                                    buttonText="Unequip"
                                    showDrop
                                    containerStyle="bg-gray-900"
                                />
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
                            >
                                Save
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default CreatureForm;