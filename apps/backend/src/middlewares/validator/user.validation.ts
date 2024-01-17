import { checkSchema } from 'express-validator'

export function RegisterValidator() {
  return checkSchema({
    username: {
      notEmpty: { bail: true },
      isLength: { options: { min: 6, max: 18 }, bail: true},
    },
    password: {
      notEmpty: { bail: true },
      isLength: { options: { min: 6, max: 18 }, bail: true},
      errorMessage: '密码不合法，请重新输入'
    },
  })
}

export function ModifyUserinfoValidator() {
  return checkSchema({
    password: {
      notEmpty: { bail: true },
      isLength: { options: { min: 6, max: 18 }, bail: true},
      errorMessage: '密码不合法，请重新输入'
    },
    signature: {
      isLength: { options: { max: 100 }, bail: true},
      errorMessage: '签名超过100个字符，请重新输入'
    }
  })
}
