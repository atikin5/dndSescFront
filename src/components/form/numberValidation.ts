// numberValidation.ts

/**
 * Валидация числа с ограничением диапазона и возможностью временного пустого значения.
 * @param value - Текущее значение поля (строка).
 * @param min - Минимальное допустимое значение.
 * @param max - Максимальное допустимое значение.
 * @returns Корректное значение после валидации.
 */
export const validateNumber = (value: string, min: number, max: number): number => {
    // Если значение пустое, возвращаем минимальное допустимое значение
    if (value.trim() === '') {
        return min;
    }

    // Преобразуем значение в число
    const parsedValue = parseInt(value, 10);

    // Если значение не является числом, возвращаем минимальное допустимое значение
    if (isNaN(parsedValue)) {
        return min;
    }

    // Ограничиваем значение в пределах допустимого диапазона
    return Math.min(max, Math.max(min, parsedValue));
};