// require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todoRoutes')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())
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

app.get('/', (req, res) => res.status(200).json({mssg: 'Welcome to the app'}))

// routes
app.use('/api/todos', todoRoutes)

// connect to db
mongoose.connect('mongodb+srv://mernapp:mernapp1@mernapp.8g2mof1.mongodb.net/')
    .then(()=> {
        app.listen(PORT, () => {
            console.log('connected to db & listening on port ', PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

    // app.listen(process.env.PORT, () => {
    //     console.log('listening on port', process.env.PORT)
    //   })

    // const port = process.env.PORT || 4001;
    // app.listen(port, () => {
    //     console.log(`Server running on port ${port}`);
    // });