const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const generateTokenAndSetCookie = require('../utils/generateToken')

const signup = async(req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({error: 'All fields are required'})
        }
        if(password !== confirmPassword){
            return res.status(400).json({error: 'Password do not match '})
        }

        const user = await User.findOne({username: username})
        if(user){
            return res.status(400).json({error: 'Username already exists'})
        } 

        // HASH PASSWORD
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy/?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl/?username=${username}`

        const newUser = new User({
            fullName: fullName,
            username: username,
            password: hashedPassword,
            gender: gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            // Generate JWT Token
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                _id: newUser._id, 
                fullName: newUser.fullName, 
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }else{
            return res.status(400).json({error: 'Invalid User Data'})
        }
    } catch (error) {
        console.log(`Error in Signup Controller: ${error.message}`)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

const login = async(req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username: username})
        if(!user){
            return res.status(400).json({error: 'Invalid Credentials'})
        }
        const isPassworMatched = await bcryptjs.compare(password, user.password)
        if(!isPassworMatched){
            return res.status(400).json({error: 'Invalid Credentials'})
        }

        // Generate JWT Token
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            prefilePic: user.profilePic
        })

    } catch (error) {
        console.log(`Error in Login Controller: ${error.message}`)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {
            maxAge: 0
        })
        res.status(200).json({message: 'Loggged Out Successfully'})
    } catch (error) {
        console.log(`Error in Logout Controller: ${error.message}`)
        res.status(500).json({error: 'Internal Server Error'})
    }
}


module.exports = {
   signup,
   login,
   logout
}