export type IUserWithoutId = Omit<IUser, 'id' | 'username'>
export type PartialIUser = Partial<IUserWithoutId>
export type IModifyUserDto = Record<string, any>
