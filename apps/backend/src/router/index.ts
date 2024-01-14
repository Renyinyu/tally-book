import type { Application, ErrorRequestHandler } from "express";

import userRouter from './user'

export default function registerRoutes(app: Application) {
  // 注册用户路由
  app.use('/api/user', userRouter);

  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })

  app.use(((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  }) as ErrorRequestHandler)
  
}