import { prisma } from '@/utils/db'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { ERROR_CODE } from '@/enums/error'
import ResponseModel from './response.model'
import { DEFAULT_AVATAR } from '@/constants'
class UserModel {
  
  /**
   * 注册
   * @param {IRegisterBody} user
   * @returns {unknown}
   */
  private async create(user: IRegisterBody) {
    try {
      const newUser = await prisma.user.create({
        data: {...user, avatar: DEFAULT_AVATAR}
      })
      return newUser
    } catch (error) {
      // 数据库参数校验错误
      if (error instanceof PrismaClientValidationError) {
        console.log(error.message)
      }
      console.log(error)
      return Promise.reject(error)
    }
  }

  async getUserByName(username: string) {
    try {
      const user = await prisma.user.findFirst({
        where: { username }
      })
      return user
    } catch (error) {
      console.log(error)
    }
  }

  async register(user: IRegisterBody) {
    try {
      const _user = await this.getUserByName(user.username)
      if (_user && _user.id) {
        return Promise.reject(new ResponseModel(ERROR_CODE.BUSINESS, '用户名已存在', null))
      }
      const result = await this.create(user)
      return new ResponseModel(ERROR_CODE.SUCCESS, '注册成功', result)
    } catch (error) {
      return new ResponseModel(ERROR_CODE.DATABASE, '注册失败', null)
    }
  }
}

export default UserModel;
