const mongoose = require('mongoose')
const loggin = require('../utilities/loggin')


const connectToDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        loggin?.('info', `MongoDB Connected: ${connect.connection.host}`)
    } catch (error) {
      loggin?.('error', `Database connection error: ${error.message}`)  
      process.exit(1)
    }
}


module.exports = {connectToDB}


//WHY IS MONGODB USED AS A DATABASE IN THIS PROJECT?

// MongoDB is used for the Todo App because it offers flexibility with its schema-less design. 
//MongoDB is highly scalable, making it ideal to grow to handle a large number of users and High volumes of tasks 
