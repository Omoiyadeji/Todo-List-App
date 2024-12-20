const { error } = require('console')
const loggin = require('../utilities/loggin')

const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500
    const message = error.message || 'Internal Server Error'

    loggin('error', `${req.method} ${req.url} - ${message}`)

    res.status(statusCode).json({
        error: {
            message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        },
    })
}

module.exports = errorHandler