import * as Yup from 'yup';

export const CreatureFormSchema = Yup.object().shape({
    currentHp: Yup.number()
        .min(0, 'Current HP must be at least 0')
        .nullable(),
    maxHp: Yup.number()
        .min(0, 'Max HP must be at least 0')
        .nullable(),
    temporaryHp: Yup.number()
        .min(0, 'Temporary HP must be at least 0')
        .nullable(),
    armorClass: Yup.number()
        .min(0, 'Armor Class must be at least 0')
        .nullable(),
    abilities: Yup.object().shape({
        strength: Yup.number().min(8).max(30),
        dexterity: Yup.number().min(8).max(30),
        constitution: Yup.number().min(8).max(30),
        intelligence: Yup.number().min(8).max(30),
        wisdom: Yup.number().min(8).max(30),
        charisma: Yup.number().min(8).max(30),
    }),
});