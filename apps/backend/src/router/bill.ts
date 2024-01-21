import { RequestHandler, Router } from 'express'
import { validationResult } from 'express-validator'

import { AddBillValidator } from '@/middlewares/validator/bill.validation'
import checkToken from '@/middlewares/checkToken';
import { ERROR_CODE } from '@/enums/error'
import ResponseModel from '@/models/response.model'
import { BillModel } from '@/models/bill'

const billModel = new BillModel()
const router: Router = Router()

router.post('/add', checkToken(), AddBillValidator(), (async (req, res, next) => {
  try {
    const valid = validationResult(req)
    if(valid.array().length) {
      const errorMsg = valid.array()[0].msg
      return res.status(ERROR_CODE.PARAMS).json(new ResponseModel(ERROR_CODE.PARAMS, errorMsg, null))
    }
    const result = await billModel.add(req.body, req.user.id)
    res.send(new ResponseModel(ERROR_CODE.SUCCESS, 'ok', result));
  } catch (error) {
    next(error)
  }
}) as RequestHandler)

export default router


