import * as JWT from 'jsonwebtoken'

/**
 * 在TypeScript中，declare global用于在具有import或export的文件中声明全局范围的内容。
 * 这对于包含import或export的文件是必要的，因为这些文件被视为模块，模块中声明的任何内容都在模块范围内。
 * 在不是模块的文件中使用declare global是错误的，因为这种文件中的所有内容都已经在全局范围内。
 */

declare global {
  interface IUserTokenPayload extends JWT.JwtPayload {
    id: number;
  }

  namespace Express {
    interface Request {
      user: IUserTokenPayload
    }
  }
}
