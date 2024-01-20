import type { Application, ErrorRequestHandler } from "express";

import userRouter from './user'
import uploadRouter from './upload'

export default function registerRoutes(app: Application) {
  // 注册用户路由
  app.use('/api/user', userRouter);

  // 上传相关路由
  app.use('/api/upload', uploadRouter);

  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })

  app.use(((err, req, res, next) => {
    console.error('global error capture:', err.stack)
    res.status(500).send('Something broke!')
  }) as ErrorRequestHandler)
  
}