const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


async function register(req , res){
    const {username , password , email} = req.body
    const existingUser = await User.findOne({$or : [{username} , {email}]})
    if(existingUser){
        return res.status(400).json({error : "Username ou email déjà utilisé"})
    }
    const hashedPassword = await bcrypt.hash(password , 10)

    const user = await User.create({
        username , 
        email , 
        password : hashedPassword
    })
    const token = jwt.sign(
  { userId: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
)
    res.status(201).json({ token, username: user.username })
}

async function login(req , res){
    const {email , password} = req.body
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return res.status(400).json({error : "Email ou mot de passe incorrect"})
    }
    const valid = await bcrypt.compare(password , user.password)
    if(!valid){
        return res.status(400).json({error : "Email ou mot de passe incorrect"})
    }
    const token = jwt.sign({
        userId : user._id , 
        username : user.username, 
    }, process.env.JWT_SECRET, {expiresIn : '1h'})
    res.json({token , username : user.username})
}

module.exports = { register , login }