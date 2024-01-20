import express from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'

import registerRoutes from './router'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.resolve(__dirname, '../public')))
app.use(cookieParser())

registerRoutes(app)

app.listen(3000, () => console.log('Example app listening on port 3000!'))