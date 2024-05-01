const mongoose = require('mongoose')

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

module.exports = connectMongoDB