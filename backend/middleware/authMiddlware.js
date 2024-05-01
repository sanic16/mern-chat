const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')

const privateRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({error: 'Unauthorized, no token found'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error: 'Unauthorized, token verification failed'})
        }

        const user = await User.findById(decoded.userId).select('-password')
        if(!user){
            return res.status(404).json({error: 'User not found'})
        }

        req.user = user

        next()

    } catch (error) {
        console.log(`Error in Private Route Middleware: ${error.message}`)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

module.exports = privateRoute