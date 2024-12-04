const User = require('../models/user');

const {hashedPasswords, comparePasswords} = require ('../helpers/auth')
const jwt = require('jsonwebtoken');


const test = (req, res) => {
    res.status(200).json('success');
}

const registerUser =  async (req, res) => {
    try {
        const {name , email, password} = req.body
        //check if name was entered
        if(!name){
            return res.json({error:'name is required'});
        };
        //check password
        if (!password || !password.length < 6){
            return res.json({error:'password is required or than 6 characters'});
        }
        //check email
        const exist = await User.findOne({email});
        if (exist){
            return res.json({error:'email is already taken',});
        }

        const hashedPasswords = await hashedPasswords(password);

        const User = await User.create({name, email, password: hashedPasswords});

        return res.json (User);
    } catch (error) {
        console.log(error)
    }
};



//login user

const loginUser = async (req, res) => {
        try {
            const {email, password} = req.body
            // check if user already exist 
            const user = await User.findOne({email});
            if (!user) {
                return res.json({error: 'User not found'});
            }
            // check if password matches

            const match = await comparePasswords(password, user.password);
            if (match){
            jwt.sign({email: user.email, id: user._id,name: user.name}, process.env.JWT_SECRET, {}, (err, token) =>{
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
            }
            if (!match){
                res.json({error: 'Passwords do not match'});
            }

        } catch (error)
        {
            console.error(error)
        }
}


const getProfile = (req, res) => {
        const {token} =  req.cookies
        if(token){
            jwt.verify(token, process.env.JWT_SECRET, {},(err, user) => {
                if(err) throw err;
                res.json(user)

            })
    }else{
        res.json(null);
    }

}


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
};