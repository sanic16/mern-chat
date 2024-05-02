const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/connectMongoDB')
const cookieParser = require('cookie-parser')
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

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/messages', require('./routes/messageRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'))
})

server.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)}
)


