export const setToLocalStorage = (key: string, value: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.setItem(key, value as string)
}

export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.getItem(key)
}
