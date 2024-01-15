import { RequestHandler, Router } from 'express';
import { validationResult } from 'express-validator'

import { RegisterValidator } from '@/middlewares/validator/user.validation'
import UserModel from '@/models/user.model'
import ResponseModel from '@/models/response.model';
import { ERROR_CODE } from '@/enums/error';

const router: Router = Router();
const userModel = new UserModel();

// 注册
router.post('/register', RegisterValidator(), (async (req, res) => {
  try {
    const valid = validationResult(req)
    if(valid.array().length) {
      const errorMsg = valid.array()[0].msg
      return res.status(400).json(new ResponseModel(ERROR_CODE.PARAMS, errorMsg, null))
    }
    const body = req.body as IRegisterBody;
    const result = await userModel.register(body)
    res.send(result)
  } catch (error) {
    console.error(error)
  }
}) as RequestHandler)

// 登录
router.post('/login', RegisterValidator(), (async (req, res) => {
  try {
    const valid = validationResult(req)
    if(valid.array().length) {
      const errorMsg = valid.array()[0].msg
      return res.status(400).json(new ResponseModel(ERROR_CODE.PARAMS, errorMsg, null))
    }
    const body = req.body as IRegisterBody;
    const result = await userModel.login(body)
    res.send(result)
  } catch (error) {
    console.error(error)
  }
}) as RequestHandler)



export default router;
