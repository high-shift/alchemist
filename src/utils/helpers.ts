function underscoreToCamelCase<T>(object: T): T {
    const newObject = {};

    for (const key in object) {
        const newKey = key.replace(/_([a-z])/g, word => word[1].toUpperCase());
        newObject[newKey] = object[key];
    }

    return newObject as T;
}

export {
    underscoreToCamelCase
};
