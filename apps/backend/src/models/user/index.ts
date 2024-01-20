import md5 from 'md5'
import jwt from 'jsonwebtoken'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'

import { prisma } from '@/utils/db'
import { ERROR_CODE } from '@/enums/error'
import { DEFAULT_AVATAR, JWT_SECRET } from '@/constants'

import ResponseModel from '../response.model'

import type { IModifyUserDto, ModifyUserKeys, PartialIUser } from './dto'

class UserModel {
  
  /**
   * 创建用户
   * @param {IRegisterBody} user
   * @returns {unknown}
   */
  private async create(user: IRegisterBody) {
    try {
      const newUser = await prisma.user.create({
        data: {...user, password: md5(user.password), avatar: DEFAULT_AVATAR}
      })
      return newUser
    } catch (error) {
      // 数据库参数校验错误
      if (error instanceof PrismaClientValidationError) {
        console.log(error.message)
      }
      console.log(error)
      // return Promise.reject(error)
    }
  }

  /**
   * 通过用户名 或 uid查询用户
   * @param username 用户名
   * @param uid 用户 ID
   * @returns 
   */
  async getUserByNameOrUid(username?: string, uid?: number) {
    try {
      const user = await prisma.user.findFirst({
        where: { username, id: uid }
      })
      return user
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 用户注册
   * @param user 用户
   * @param user.username 用户名
   * @param user.password 密码
   * @returns 
   */
  async register(user: IRegisterBody) {
    try {
      const _user = await this.getUserByNameOrUid(user.username)
      if (_user && _user.id) {
        return new ResponseModel(ERROR_CODE.BUSINESS, '用户名已存在', null)
      }
      const result = await this.create(user)
      return new ResponseModel(ERROR_CODE.SUCCESS, '注册成功', result)
    } catch (error) {
      return new ResponseModel(ERROR_CODE.DATABASE, '注册失败', null)
    }
  }

  /**
   * 用户登录
   * @param user 用户
   * @param user.username 用户名
   * @param user.password 密码
   */
  async login(user: IRegisterBody): Promise<ResponseModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfo = await this.getUserByNameOrUid(user.username)
        // 校验用户是否存在
        if (!userInfo || !userInfo.id) {
          return resolve(new ResponseModel(ERROR_CODE.BUSINESS, '用户不存在', null))
        }
        // 校验密码
        if (md5(user.password)!== userInfo.password) {
          return resolve(new ResponseModel(ERROR_CODE.BUSINESS, '账号密码错误', null))
        }
        // 一天后过期
        // const expired = Date.now() + 1000 * 60 * 60 * 24
        jwt.sign({ id: userInfo.id }, JWT_SECRET, { expiresIn: '1d' }, (err, encodded) => {
          if (err) {
            console.log(err)
            return resolve(new ResponseModel(ERROR_CODE.BUSINESS, '登录失败', null))
          }
          resolve(new ResponseModel(ERROR_CODE.SUCCESS, '登录成功', { token: encodded }))
        })
      } catch (error) {
        resolve(new ResponseModel(ERROR_CODE.DATABASE, '登录失败', null))
      }
    })
  }

  /**
   * 获取用户信息
   * @param {IUserTokenPayload} user token
   */
  async getUserinfo(payload: IUserTokenPayload) {
    const user = await this.getUserByNameOrUid(undefined, payload.id)
    if (!user || !user.id) return null
    return {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      signature: user.signature || ''
    }
  }

  /**
   * 更新用户信息
   * @param body {IModifyUserDto} 要修改的用户信息
   * @param payload 
   */
  async modifyUserinfo(body: IModifyUserDto<PartialIUser>, payload: IUserTokenPayload) {
    const keys = Object.keys(body).filter(key => key in body)
    
    const userinfo = await this.getUserByNameOrUid(undefined, payload.id)
    if (!userinfo || !userinfo.id) {
      return null
    }
    if (userinfo) {
      (keys as ModifyUserKeys[]).forEach((key: ModifyUserKeys) => {
        if (key in userinfo && body[key]) {
          userinfo[key] = body[key]!
        }
      })
    }
    const result = await prisma.user.update({
      data: userinfo,
      where: { id: userinfo.id }
    })
    return {
      id: result.id,
      username: result.username,
      avatar: result.avatar,
      signature: result.signature || ''
    }
  }
}

export default UserModel;
