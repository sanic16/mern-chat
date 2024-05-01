const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connectMongoDB')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json()) // to parse the incoming requests with JSON payloads (from req.body) 
app.use(cookieParser())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/messages', require('./routes/messageRoutes'))

app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)}
)


