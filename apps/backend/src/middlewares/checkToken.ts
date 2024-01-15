import { JWT_SECRET } from '@/constants'

import type { RequestHandler } from 'express'


/**
 * 校验 token 中间件
 * @returns {RequestHandler}
 */
export default function checkToken(): RequestHandler {
  const middleware: RequestHandler = (req, res, next) => {
    if (req.get('Authorization')) {

    }
  }
  return middleware
}