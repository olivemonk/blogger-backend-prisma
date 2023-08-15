const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const userRouter = require('./routes/userRoute')
const postRouter = require('./routes/postRoutes')
const { post } = require('./prisma')



const app = express()

// regular middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cookie parser middleware
app.use(cookieParser())

app.use('/api', userRouter)
app.use('/api', postRouter)


app.get('/', (req,res)=>{
  res.send('Hello World')
})





app.listen(3000, () => {
    console.log('Server is running on port 3000')
})