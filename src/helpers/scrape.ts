/**
 *  loop through an object
 *  create new object using pre-existing keys, using a new value
 *  the pre-existing value of each key will be passed to a callback that will return a string
 */
export const cloneObjectUpdateValues = async (object: object, callback: (s: string) => void) => {
    const clone = new Object
    for (const key of Object.keys(object)) {
        clone[key] = await callback(object[key])
    }
    return clone
}

export const cleanScrapedValue = (s: string) => {
    if (!s) return null
    return s.replace(/\r?\n|\r/g, '').trim();
}