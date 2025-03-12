import Select, {GroupBase} from "react-select"
import React, {useContext} from "react";
import ItemList from "./ItemList";
import ConditionSkillList from "./ConditionSkillList";
import AbilityTable from "./AbilityTable";
import {Field, Form, Formik} from "formik";
import {Size} from "../../enums/Size";
import {Race} from "../../enums/Race";
import {Skill} from "../../enums/Skill";
import {ICreature} from "../../interfaces/ICreature";
import {IItem} from "../../interfaces/IItem";
import {ILocation} from "../../interfaces/ILocation";
import {Condition} from "../../enums/Condition";
import axios from "axios";
import {validateData} from "./validateData";
import {ModalContext} from "../../context/ModalContext";

interface OptionType {
    value: string;
    label: string;
    id: number;
}

const CreatureForm = ({creature, locations, items}: {
    creature: ICreature;
    locations: ILocation[];
    items: IItem[] | [];
}) => {
    const locationOptions: OptionType[] = locations.map((loc) => ({
        value: loc.name,
        label: loc.name,
        id: loc.id,
    }));

    const {closeModal} = useContext(ModalContext);

    // Состояние для ошибки
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    // Функция для показа ошибки
    const showError = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 2000);
    };

    const customStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: '#1f2937',
            borderColor: 'yellow',
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: '#1f2937',
            color: 'yellow',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected ? 'yellow' : '#1f2937',
            color: state.isSelected ? 'black' : 'yellow',
        }),
        singleValue: (base: any) => ({
            ...base,
            color: 'yellow',
        }),
    };

    const validateItemPositions = (
        creature: ICreature,
        equippedItems: IItem[],
        newItem: IItem
    ): string | null => {
        const positions = [
            'handPosition',
            'fingerPosition',
            'headPosition',
            'bodyPosition',
            'footPosition',
            'cloakPosition',
            'legsPosition',
            'neckPosition',
        ];

        const currentEquippedSum = equippedItems.reduce(
            (acc, item) => {
                positions.forEach((pos) => {
                    acc[pos] += item.itemPosition[pos] || 0;
                });
                return acc;
            },
            positions.reduce((acc, pos) => ({ ...acc, [pos]: 0 }), {})
        );

        const newEquippedSum = positions.reduce((acc, pos) => {
            acc[pos] = currentEquippedSum[pos] + (newItem.itemPosition[pos] || 0);
            return acc;
        }, {});

        for (const pos of positions) {
            if (newEquippedSum[pos] > creature.maxItemPosition[pos]) {
                const part = pos.replace('Position', '');
                return `Not enough ${part} position to equip this item.`;
            }
        }

        return null;
    };
    const saveCreature = async (values) => {
        const data = validateData(values);
        try {
            const response = await axios({
                method: "PUT",
                url: `http://localhost:8080/creature/${creature.id}/update`,
                data: data,
            });

            console.log("Server response:", response.data);
        } catch (error) {
            console.error("Error updating creature:", error);
            showError("Failed to update creature. Please try again.");
        }
    };

    const handleNumberInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: string,
        setFieldValue: (field: string, value: any) => void
    ) => {
        const rawValue = e.target.value;
        if (/^\d*$/.test(rawValue)) {
            setFieldValue(fieldName, rawValue === '' ? 0 : parseInt(rawValue, 10));
        }
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement>,
        fieldName: string,
        setFieldValue: (field: string, value: any) => void
    ) => {
        const value = Math.max(0, parseInt(e.target.value, 10));
        setFieldValue(fieldName, value);
    };

    return (
        <div className="bg-[#0e0e14] text-yellow-400 p-6 rounded-lg shadow-lg max-w-screen-xl mx-auto ">
            <h1 className="text-2xl font-bold mb-4">Edit Creature</h1>
            {errorMessage && (
                <div className="text-red-500 bg-red-900 p-2 rounded mb-4">
                    {errorMessage}
                </div>
            )}

            <Formik
                initialValues={{
                    type: creature.type,
                    operational: creature.operational,
                    currentHp: creature.currentHp,
                    maxHp: creature.maxHp,
                    temporaryHp: creature.temporaryHp,
                    armorClass: creature.armorClass,
                    abilities: creature.abilities,
                    conditions: creature.conditions || [],
                    skills: creature.skills || [],
                    size: creature.size,
                    race: creature.race,
                    backpackItems: creature.backpackItems,
                    equippedItems: creature.equippedItems,
                    locationId: creature.locationId,
                    items: items || [],
                }}
                onSubmit={(values) => {
                    console.log('Updated Creature:', values);
                }}
            >
                {({values, setFieldValue}) => {


                    return (
                        <Form>
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
                                    styles={customStyles}
                                    components={{
                                        IndicatorSeparator: () => null,
                                    }}
                                />
                            </div>

                            <div className="flex gap-4 mb-4 bg-gray-800 p-2 rounded-lg">
                                <div className="flex flex-col items-center">
                                    <label className="block mb-1">Current HP</label>
                                    <Field
                                        type="text"
                                        name="currentHp"
                                        className="w-20 text-center bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                        value={values.currentHp}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleNumberInput(e, 'currentHp', setFieldValue)
                                        }
                                        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                            handleBlur(e, 'currentHp', setFieldValue)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="block mb-1">Max HP</label>
                                    <Field
                                        type="text"
                                        name="maxHp"
                                        className="w-20 text-center bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                        value={values.maxHp}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleNumberInput(e, 'maxHp', setFieldValue)
                                        }
                                        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                            handleBlur(e, 'maxHp', setFieldValue)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="block mb-1">Temporary HP</label>
                                    <Field
                                        type="text"
                                        name="temporaryHp"
                                        className="w-20 text-center bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                        value={values.temporaryHp}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleNumberInput(e, 'temporaryHp', setFieldValue)
                                        }
                                        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                            handleBlur(e, 'temporaryHp', setFieldValue)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="block mb-1">Armor Class</label>
                                    <Field
                                        type="text"
                                        name="armorClass"
                                        className="w-20 text-center bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                        value={values.armorClass}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleNumberInput(e, 'armorClass', setFieldValue)
                                        }
                                        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                            handleBlur(e, 'armorClass', setFieldValue)
                                        }
                                    />
                                </div>
                            </div>
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

                            <div className="flex gap-4 mb-4">
                                <AbilityTable
                                    abilities={values.abilities}
                                    onChange={(ability, value) => {
                                        setFieldValue(`abilities.${ability}`, value);
                                    }}
                                />

                                <div className="flex-1 flex gap-4">
                                    <ConditionSkillList
                                        title="Conditions"
                                        allItems={Object.values(Condition)}
                                        selectedItems={values.conditions}
                                        onAdd={(item) => {
                                            setFieldValue('conditions', [...values.conditions, item]);
                                        }}
                                        onRemove={(item) => {
                                            setFieldValue(
                                                'conditions',
                                                values.conditions.filter((i) => i !== item)
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

                            <div className="flex gap-4 mb-4">
                                <ItemList
                                    title="New Items"
                                    items={values.items}
                                    onItemClick={(item) => {
                                        if (!values.backpackItems.some((i) => i.id === item.id)) {
                                            setFieldValue('backpackItems', [...values.backpackItems, item]);
                                            setFieldValue(
                                                'items',
                                                values.items.filter((i) => i.id !== item.id)
                                            );
                                        }
                                    }}
                                    buttonText="Add to Backpack"
                                    containerStyle="bg-gray-800"
                                />

                                <ItemList
                                    title="Backpack Items"
                                    items={values.backpackItems}
                                    onItemClick={(item) => {
                                        const validationError = validateItemPositions(creature, values.equippedItems, item);
                                        if (validationError) {
                                            showError(validationError);
                                            return
                                        }
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
                                    containerStyle="bg-gray-800"
                                />

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
                                    containerStyle="bg-gray-800"
                                />
                            </div>

                            <button
                                type="button"
                                className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 mr-2"
                                onClick={() => {
                                    saveCreature(values);
                                    closeModal();
                                }}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="mt-4 bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => {
                                    closeModal();
                                }}
                            >
                                Close
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default CreatureForm;