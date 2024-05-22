// Exclude keys from an object
export function excludeFromObject<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key as K))) as Omit<T, K>
}

// Exclude keys from objects in a list
export function excludeFromList<T, K extends keyof T>(objects: T[], keysToDelete: K[]): Omit<T, K>[] {
    return objects.map((obj) => excludeFromObject(obj, keysToDelete)) as Omit<T, K>[]
}

export interface SuccessResponse {
    status: "success",
    code: number,
    message: string
    data: object | any,
}

export const generateRandomToken = () => {
    const min = 100000;
    const max = 999999;
    const randomDecimal = Math.random();
    const randomScaled = Math.floor(randomDecimal * (max - min + 1)) + min;
    return randomScaled;
}