const loggin = (level, message) => {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`)
}


module.exports = loggin