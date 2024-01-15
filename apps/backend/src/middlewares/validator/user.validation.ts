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