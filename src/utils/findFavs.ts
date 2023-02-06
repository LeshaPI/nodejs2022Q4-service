export const findFavs = (dbArray, ids: string[]) => {
    return ids.reduce((acc, id) => {
        const index = dbArray.findIndex((dbValue) => dbValue.id === id);
        const value = dbArray[index];
    
        if(value) {
            return [...acc, value];
        }

        return acc;
    }, []);
}

