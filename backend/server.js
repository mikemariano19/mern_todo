require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todoRoutes')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next();
})

// app.get('/', (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })

// routes
app.use('/api/todos', todoRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port ', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

    // app.listen(process.env.PORT, () => {
    //     console.log('listening on port', process.env.PORT)
    //   })