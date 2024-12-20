const express = require ('express')
const dotenv = require ('dotenv')
const path = require ('path')
const cookieParser = require ('cookie-parser')
const methodOverride = require ('method-override')
const { connectToDB } = require('./server/configs/database')

dotenv.config();

connectToDB()

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'client/views'))


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())
app.use(methodOverride('_method'))


app.use(express.static(path.join(__dirname, 'client/public')))


app.get('/', (req, res ) => {
    res.render('index')
})
app.use('/users', require('./server/routes/userRoutes'))
app.use('/tasks', require('./server/routes/taskRoutes'))


app.use(require('./server/middlewares/errorMiddleware'))



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`server running on localhost//:${PORT}`)
})