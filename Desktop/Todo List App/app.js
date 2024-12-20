const express = require ('express')
const app = express()
const path = require ('path')
const cookieParser = require ('cookie-parser')
require('dotenv').config()


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../client/views'))


app.get('/', (req, res) => {
    res.render('index')
})


app.use(express.static(path.join(__dirname, '../client/public')))


app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use(cookieParser())


app.use((req, res) => {
    console.log(`[${req.method}] ${req.url}`)
    next()
})


const userRoutes = require('./server/middlewares/errorMiddleware')
const taskRoutes = require('./server/routes/taskRoutes')
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)


const errorMiddleware = require('./server/middlewares/errorMiddleware')
app.use(errorMiddleware)


module.exports = app