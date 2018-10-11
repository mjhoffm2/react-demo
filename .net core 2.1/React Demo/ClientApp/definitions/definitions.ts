export * from './stateDefinitions';

//helper types
export type KeysExcept<T, K extends keyof T> = {
    [Key in keyof T]: K extends Key ? never : Key
}[keyof T]

export type RemoveKeys<T, K extends keyof T> = Pick<T, KeysExcept<T, K>>;