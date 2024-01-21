import type { Application, ErrorRequestHandler } from "express";

import userRouter from './user'
import uploadRouter from './upload'
import billRouter from './bill'
import ResponseModel from "@/models/response.model";
import { ERROR_CODE } from "@/enums/error";

export default function registerRoutes(app: Application) {
  // 注册用户路由
  app.use('/api/user', userRouter);

  // 上传相关路由
  app.use('/api/upload', uploadRouter);

  // 账单相关路由
  app.use('/api/bill', billRouter);

  // 404 
  app.use((req, res, next) => {
    res.status(ERROR_CODE.NOT_FOUND).send(new ResponseModel(ERROR_CODE.NOT_FOUND, '接口不存在', null))
  })

  // Error
  app.use(((err, req, res, next) => {
    console.error('global error capture:', err.stack)
    res.status(ERROR_CODE.BUSINESS).send(new ResponseModel(ERROR_CODE.BUSINESS, '系统错误', null))
  }) as ErrorRequestHandler)
  
}