import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
import express, { Application } from 'express'
import cors from 'cors'
import corsOptions from './cors'
import apiRoutes from './routes'
import prisma from './db'

dotenv.config()

const PORT = process.env.API_PORT ?? 3001
const app: Application = express()

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors(corsOptions))
  .use(apiRoutes)

try {
  app.listen(PORT)
  prisma.$connect()
  console.log(`Server running on port ${PORT}`)
} catch (error: any) {
  console.error(error)
  process.exit()
}
