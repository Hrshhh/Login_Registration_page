// export const message = (req, res) => {
//     res.status(200).send(`Message is ${req.params.message}`)
// };
import bcrypt from 'bcrypt';
import User from "../models/user";
import jwt from "jsonwebtoken";
require("dotenv").config();


export const register = async(req, res) => {
    console.log("From frontend ",req.body);
    const {name, email, password} = req.body;

    if(!name) return res.status(400).send('Name is required')
    if(!password || password.length < 6) return res.status(400).send("Password is required or should be min 6 char long")

    let userExist = await User.findOne({email}).exec()
    // console.log(userExist)
    // if(userExist){
    //     console.log("Yesss");
    // }
    if(userExist) return res.status(400).send("Email is taken")

    const user = new User(req.body);
    // console.log(user)
    try{
        await user.save();
        console.log("User created ", user);
        return res.status(200).json({ok: true})
    }
    catch(err){
        console.log("Create user failed ",err);
        return res.status(400).send("Error try again")
    }
};

export const login = async(req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    try{
        console.log("HI")
        let user = await User.findOne({ email }).exec();
        if(user == null) res.status(400).send("User with that email is not found");
        // console.log(user);
        if(user){
            user.comparePassword(password, function(err, match) {
                console.log(err);
                if(!match || err) return res.status(400).send("Wrong Password");
                // console.log(process.env.DATABASE)
                let token = jwt.sign({ _id: user._id }, "secret", {
                    expiresIn: '5d'
                });
                // console.log("Token",token)
                res.json({ token, user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                } });
            });
        } 
    }
    catch(err){
        console.log("err")
        console.log('Login err ', err);
        res.status(400).send("Sigin failed")
    }
}