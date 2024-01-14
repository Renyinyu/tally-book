import { prisma } from '@/utils/db'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

class UserModel {
  static async create(user: IRegisterBody) {
    console.log('create user')
    try {
      const newUser = await prisma.user.create({
        data: {...user, avatar: ''}
      })
      return newUser
    } catch (error) {
      // 数据库参数校验错误
      if (error instanceof PrismaClientValidationError) {
        console.log(error.message)
      }
      console.log(error)
    }
  }
}

export default UserModel;
