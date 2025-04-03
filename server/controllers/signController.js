const User  = require('../models/signModel');
const bcrypt = require('bcrypt');

module.exports.register = async( req,res,next ) => {
    try {
        const { username,email,password } = req.body;

        const isUsername = await User.findOne({ username });
            if(isUsername) {
                 return res.json({msg: "Username is already used!", status: false});
            };
        const isEmail = await User.findOne({ email });
            if(isEmail) {
                return res.json({msg: "Email is already used!", status: false});
            };
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user })
    } catch (err) {
        next(err)
    };
};

module.exports.login = async( req,res,next ) => {
    try {
        const { username,password } = req.body;

        const user = await User.findOne({ username });
            if(!user) {
                 res.json({msg: "Incorrect username or password!", status: false });
            };
        const isPasswordValid = await bcrypt.compare( password, user.password )
            if(!isPasswordValid) {
                res.json({msg: "Incorrect username or password!", status: false });
            };
        delete user.password;
        return await res.json({status: true, user})
    } catch (err) {
        next(err)
    };
};


module.exports.getAllUsers = async( req,res,next ) => {
    const { username } = req.query;

    try {
        const users = await User.find({
            username: { $regex: `^${username}`, $options: "i" }
        });
    
        return res.json(users)
    } catch(err) {
        next(err)
    }
};
