export const canEquipItem = (equippedItems, maxItemPosition, item) => {
    const currentPositions = equippedItems.reduce(
        (acc, curr) => {
            Object.keys(curr.itemPosition).forEach((key) => {
                acc[key] = (acc[key] || 0) + (curr.itemPosition[key] || 0);
            });
            return acc;
        },
        {}
    );

    return Object.keys(item.itemPosition).every((key) => {
        return (currentPositions[key] || 0) + (item.itemPosition[key] || 0) <= maxItemPosition[key];
    });
};