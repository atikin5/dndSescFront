import {useState} from "react";
import Select, {components , GroupBase } from "react-select"
import React from "react";
import {Condition, Race, Size, Skill} from "../../enums";
import AbilityInput from "./AbilityInput";
import ItemList from "./ItemList";
import {canEquipItem} from "./canEqiuipItem";
import {IAbilities} from "../../base";
import {ICreature, IItem, ILocation} from "../../models";
import ConditionSkillList from "./ConditionSkillList";
import AbilityTable from "./AbilityTable";
import {validateNumber} from "./numberValidation";
import {CreatureFormSchema} from "./CreatureFormSchema";
import {ErrorMessage, Field, Form, Formik} from "formik";

interface OptionType {
    value: string;
    label: string;
    id: number;
}

const CreatureForm = ({ creature, locations, items }: { creature: ICreature; locations: ILocation[]; items: IItem[] }) => {
    // Преобразование локаций в формат, подходящий для react-select
    const locationOptions: OptionType[] = locations.map((loc) => ({
        value: loc.name,
        label: loc.name,
        id: loc.id,
    }));

    return (
        <div className="bg-[#0e0e14] text-yellow-400 p-6 rounded-lg shadow-lg max-w-screen-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Creature</h1>

            <Formik
                initialValues={{
                    operational: creature.operational,
                    currentHp: creature.currentHp || 0 || '',
                    maxHp: creature.maxHp || 0|| '',
                    temporaryHp: creature.temporaryHp || 0|| '',
                    armorClass: creature.armorClass || 0|| '',
                    abilities: creature.abilities,
                    condition: creature.condition || [],
                    skills: creature.skills || [],
                    size: creature.size,
                    race: creature.race,
                    backpackItems: creature.backpackItems,
                    equippedItems: creature.equippedItems,
                }}
                validationSchema={CreatureFormSchema}
                onSubmit={(values) => {
                    console.log('Updated Creature:', values);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        {/* Error Messages */}
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

                        {/* Numeric Fields (HP and Armor Class) */}
                        <div className="flex gap-4 mb-4 bg-gray-800 p-4 rounded-lg">
                            <div className="flex-1">
                                <label className="block mb-2">Current HP</label>
                                <Field
                                    type="text"
                                    name="currentHp"
                                    className="w-full bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onBlur={() => {
                                        const value = values.currentHp === null || values.currentHp === '' ? 0 : values.currentHp;
                                        setFieldValue('currentHp', value);
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2">Max HP</label>
                                <Field
                                    type="text"
                                    name="maxHp"
                                    className="w-full bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onBlur={() => {
                                        const value = values.maxHp === null || values.maxHp === '' ? 0 : values.maxHp;
                                        setFieldValue('maxHp', value);
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2">Temporary HP</label>
                                <Field
                                    type="text"
                                    name="temporaryHp"
                                    className="w-full bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onBlur={() => {
                                        const value = values.temporaryHp === null || values.temporaryHp === '' ? 0 : values.temporaryHp;
                                        setFieldValue('temporaryHp', value);
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2">Armor Class</label>
                                <Field
                                    type="text"
                                    name="armorClass"
                                    className="w-full bg-gray-700 text-yellow-400 border border-yellow-400 px-2 py-1"
                                    onKeyPress={(e) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    onBlur={() => {
                                        const value = values.armorClass === null || values.armorClass === '' ? 0 : values.armorClass;
                                        setFieldValue('armorClass', value);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Size and Race */}
                        <div className="flex gap-4 mb-4 bg-gray-800 p-4 rounded-lg">
                            <div className="flex-1">
                                <label className="block mb-2">Size</label>
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
                            <div className="flex-1">
                                <label className="block mb-2">Race</label>
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
                            <ItemList
                                title="New Items"
                                items={items}
                                onItemClick={(item) => {
                                    setFieldValue('backpackItems', [...values.backpackItems, item]);
                                }}
                                buttonText="Add to Backpack"
                                containerStyle="bg-gray-800"
                            />
                            <ItemList
                                title="Backpack Items"
                                items={values.backpackItems}
                                onItemClick={(item) => {
                                    setFieldValue('equippedItems', [...values.equippedItems, item]);
                                    setFieldValue(
                                        'backpackItems',
                                        values.backpackItems.filter((i) => i.id !== item.id)
                                    );
                                }}
                                onDrop={(item) => {
                                    setFieldValue(
                                        'backpackItems',
                                        values.backpackItems.filter((i) => i.id !== item.id)
                                    );
                                    setFieldValue('items', [...values.backpackItems, item]);
                                }}
                                buttonText="Equip"
                                showDrop
                                containerStyle="bg-gray-700"
                            />
                            <ItemList
                                title="Equipped Items"
                                items={values.equippedItems}
                                onItemClick={(item) => {
                                    setFieldValue('backpackItems', [...values.backpackItems, item]);
                                    setFieldValue(
                                        'equippedItems',
                                        values.equippedItems.filter((i) => i.id !== item.id)
                                    );
                                }}
                                onDrop={(item) => {
                                    setFieldValue(
                                        'equippedItems',
                                        values.equippedItems.filter((i) => i.id !== item.id)
                                    );
                                    setFieldValue('items', [...values.equippedItems, item]);
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
                )}
            </Formik>
        </div>
    );
};

export default CreatureForm;