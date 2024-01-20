export type IUserWithoutId = Omit<IUser, 'id' | 'username'>
export type PartialIUser = Partial<IUserWithoutId>
export type IModifyUserDto<T extends PartialIUser> = {
  [key in keyof T]?: T[key]
}
export type ModifyUserKeys = keyof IModifyUserDto<PartialIUser> & {}