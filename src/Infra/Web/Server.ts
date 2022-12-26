import express, {Request, Response} from "express";
import * as dotenv from 'dotenv'
import routes from './Routes'

dotenv.config()

const app = express()

const middleware = (req:Request, res:Response, next:any) => {
    console.log('Hi i am a middleware')
    next()
}

app.use(express.json())
app.use(middleware)
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log('Server running at localhsot:' + process.env.PORT)
})