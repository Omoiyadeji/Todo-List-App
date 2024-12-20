const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log('Auth Middleware Triggered')

    console.log('cookies:', req.cookies)

    const token = req.cookies?.authToken || req.headers['authorization']?.split('')[1]

    console.log('Auth Token:', token)

    if(!token) {
        console.log('No Tokem Found. Redirecting To Login')
        return res.redirect('/users/login')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log('Decoded Token:', decoded)

        req.user = decoded
        next()
    } catch (error) {
        console.error('Authentication error:', error.message)
        console.log('Redirecting To Login Due To Invalid Token.')
        return res.redirect('/users/login')
    }
}