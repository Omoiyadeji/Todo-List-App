const User = require ('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.register = async (req, res, next) => {
    try {
        const {username, password } = req.body

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.render('register', {errorMessage: 'Username already exists', successMessage: null})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({username, password: hashedPassword})
        console.log('User Created')

        return res.redirect('/users/login')
    } catch (error) {
        console.error('Error During Registration:', error.message)
        return res.render('register', {errorMessage: 'Error During Registration. Please Try Again', successMessage: null})
    }
}


exports.login = async (req, res, next) => {
    try {
        const { username, password} = req.body

        console.log('Login Request:', { username})

        const user = await User.findOne({username})
        console.log('User Found:', user)

        if(!user) {
            return res.render('login', {errorMessage: 'Invalid Username or Password', successMessage: null})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        console.log('Password Match:', isMatch)

        if(!isMatch) {
            return res.render('login', {errorMessage: 'Invalid Username or Password', successMessage: null})
        }

        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {
            expiresIn: '1d',
        })

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 23 * 70 * 70 * 500,
        })

        res.redirect('/tasks')
    } catch (error) {
       console.error('Error During Login:', error.message)
       res.render('login', { errorMessage: 'Error During Login. Please Try Again.', successMessage: null}) 
    }
}
