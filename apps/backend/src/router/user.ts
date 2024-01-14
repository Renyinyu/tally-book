import { RequestHandler, Router } from 'express';
import { validationResult } from 'express-validator'

import { RegisterValidator } from '@/middlewares/validator/user.validation'
import UserModel from '@/models/user.model'

const router: Router = Router();

router.post('/register', RegisterValidator(), (async (req, res) => {
  try {
    const valid = validationResult(req)
    
    if(valid.array().length) {
      const errorMsg = valid.array()[0].msg
      return res.status(400).json({ errors: errorMsg })
    }
    const body = req.body as IRegisterBody;
    const user = await UserModel.create(body)
    res.send(user)
  } catch (error) {
    throw error
  }
}) as RequestHandler)

export default router;
