import { RequestHandler, Router } from 'express';
import { validationResult } from 'express-validator'

import { RegisterValidator, ModifyUserinfoValidator } from '@/middlewares/validator/user.validation'
import checkToken from '@/middlewares/checkToken';
import UserModel from '@/models/user'
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

router.get('/getUserinfo', checkToken(), async (req, res) => {
  try {
    const user = await userModel.getUserinfo(req.user)
    res.send(new ResponseModel(ERROR_CODE.SUCCESS, 'ok', user))
  } catch (error) {
    console.error(error)
  }
})

router.post('/modifyUserinfo', checkToken(), ModifyUserinfoValidator(), (async (req, res) => {
  try {
    const result = await userModel.modifyUserinfo(req.body, req.user)
    res.send(new ResponseModel(ERROR_CODE.SUCCESS, 'ok', result))
  } catch (error) {
    throw error;
  }
}) as RequestHandler)



export default router;
