import express from 'express'
import {videosRouter} from './routes/videos-router';

const app = express()
const port = 3000

app.use(express.json())

//routes
app.use('/testing/all-data', videosRouter)
app.use('/videos', videosRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
