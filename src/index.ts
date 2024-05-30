import express, {Request, Response} from 'express'
import {productsRouter} from './routes/products-router';

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World123!')
})

app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
