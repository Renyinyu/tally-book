import { checkSchema } from 'express-validator'

export function AddBillValidator() {
  return checkSchema({
    amount: {
      notEmpty: { bail: true },
      isString: { bail: true },
      errorMessage: 'amount 参数不合法'
    },
    typeId: {
      notEmpty: { bail: true },
      isInt: { bail: true },
      errorMessage: 'typeId 参数不合法'
    },
    typeName: {
      notEmpty: { bail: true },
      isString: { bail: true },
      errorMessage: 'typeName 参数不合法'
    },
    date: {
      notEmpty: { bail: true },
      // isDate: true,
      errorMessage: 'date 参数不合法'
    },
    payType: {
      notEmpty: { bail: true },
      isInt: { bail: true },
      errorMessage: 'payType 参数不合法'
    },
    remark: {
      optional: true,
      isString: { bail: true },
      errorMessage:'remark 参数不合法'
    }
  })
}

export function ModifyBillValidator() {
  return checkSchema({
    id: {
      notEmpty: { bail: true },
      isInt: { bail: true },
      errorMessage: 'id 参数不存在不合法'
    },
    amount: {
      optional: true,
      isString: { bail: true },
      errorMessage: 'amount 参数不合法'
    },
    typeId: {
      optional: true,
      isInt: { bail: true },
      errorMessage: 'typeId 参数不合法'
    },
    typeName: {
      optional: true,
      isString: { bail: true },
      errorMessage: 'typeName 参数不合法'
    },
    date: {
      optional: true,
      errorMessage: 'date 参数不合法'
    },
    payType: {
      optional:true,
      isInt: { bail: true },
      errorMessage: 'payType 参数不合法'
    },
    remark: {
      optional: true,
      isString: { bail: true },
      errorMessage:'remark 参数不合法'
    }
  })
}

export function RemoveBillValidator() {
  return checkSchema({
    id: {
      notEmpty: { bail: true },
      isInt: { bail: true },
      errorMessage: 'id 参数不存在不合法'
    }
  })
}