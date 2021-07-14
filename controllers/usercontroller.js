const router = require("express").Router()
const { UserModel } = require("../models")
const User = require("../models/user")
const { UniqueConstraintError } = require("sequelize/lib/errors")
const jwt = require("jsonwebtoken")


router.post("/register", async (req, res) => {
    let { firstName, lastName, email, password } = req.body.user
    try{
        const User = await UserModel.create({
            firstName,
            lastName,
            email,
            password
            })
            let token = jwt.sign({id: User.id, email: User.email}, "secret-key", {expiresIn: 60 * 60 *24})
            res.status(201).json({
                message: "User registered successfully",
                user: User,
            })
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                res.status(409).json ({
                message: "Email already exists"
            })
        }
        res.status(500).json({
            message: "failed to register user"
        })
    }
    
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
        try { 
        let loginUser = await UserModel.findOne({
            where: {
                email: email
            }
        })
        if(loginUser) {
            res.status(209).json({
                user: loginUser,
                message: "user logged in"
            })
        } else {
            res.status(401).json({
                message: "User not authorized"
            })
        }
        } catch (err) {
            res.status(500).json({
                message: "failed to login"
            })
        } 
})


module.exports = router


