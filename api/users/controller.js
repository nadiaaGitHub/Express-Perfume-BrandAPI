
require('dotenv').config()
const User = require('./model')
const { connect } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')



const SignUp = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        await connect(process.env.MONGO_URL)
        console.log("DB Connected")
        const existingUser = await User.exists({ email: email })
        if (existingUser) {
            res.status(208).json({
                message: "User Already Exists"
            })
        }

        else {
            await User.create({ username, email, password: await hash(password, 12) })
            console.log("User Created")
            res.status(201).json({
                message: "Signup Successfully"
            })
        }
    }
    catch (error) {
        res.json({
            message: "Error"
        })
    }
}

const Login = async (req, res) => {

    const { password, email } = req.body;

    try {
        await connect(process.env.MONGO_URL)
        const checkExistUser = await User.findOne({ email: email })

        if (!checkExistUser) {
            res.status(404).json({
                message: "User not found"
            })
        }

        else {
            const decryptPass =  await compare(password, checkExistUser.password)
            console.log(decryptPass)

            if(email == checkExistUser.email && decryptPass){
                const token = sign(
                    {
                        username : checkExistUser.username,
                        id : checkExistUser._id,
                        email : checkExistUser.email
                    }
                    ,
                    process.env.JWT_SECRET
                )





                res.status(200).json({
                    message: "Successfully Signed in",
                    token : token
                })
            }
            else{
                res.json({
                    message: "Invalid Credentials"
                })
            }

           

               
        }

    }
    catch (error) {
        res.json({
            message: "Error"
        })

    }
}

module.exports = { SignUp, Login,}