const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connectMongoDB')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {
    app,
    server
} = require('./socket/socket')

dotenv.config()

const PORT = process.env.PORT || 5000

// Middleware
// app.use(cors({ origin: 'http://localhost:3000', credentials: true}))
app.use(express.json()) // to parse the incoming requests with JSON payloads (from req.body) 
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('working...')
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/messages', require('./routes/messageRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

server.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)}
)


