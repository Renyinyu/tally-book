import jwt from 'jsonwebtoken';

import ResponseModel from '@/models/response.model';
import { JWT_SECRET } from '@/constants'
import { ERROR_CODE } from '@/enums/error';

import type { RequestHandler } from 'express'


/**
 * 校验 token 中间件
 * @returns {RequestHandler}
 */
export default function checkToken(): RequestHandler {
  const middleware: RequestHandler = (req, res, next) => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7);
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(new ResponseModel(ERROR_CODE.TOKEN_EXPIRED, 'token 过期或没有携带 token', null));
        }
        req.user = decoded as IUserTokenPayload
        next();
      });
      return
    }
    return res.status(401).json(new ResponseModel(ERROR_CODE.TOKEN_EXPIRED, 'token 不存在', null));
  }
  return middleware
}