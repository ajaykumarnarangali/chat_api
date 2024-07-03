const User = require('../models/userSchema');
const { errorHandler } = require('../utils/errorHandler');
const jwt = require('jsonwebtoken')

module.exports.Register = async (req, res, next) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            return next(errorHandler(401, "username already exists"));
        }

        const profile = `https://avatar.iran.liara.run/public/${gender == 'male' ? 'boy' : 'girl'}?username=${username}`;

        const newUser = new User({
            fullname,
            username,
            password,
            gender,
            profile
        })
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, "secret", { expiresIn: '15d' });

        const { password: pass, gender: gent, ...rest } = newUser._doc;
        res.cookie("access_token", token).status(200).json({ user: rest })

    } catch (error) {
        next(error)
    }
}
module.exports.Login = async (req, res, next) => {
    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return next(errorHandler(401, "username not found"));
        }

        if (user.password !== password) {
            return next(errorHandler(401, "incorrect password"));
        }

        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: '15d' });

        const { password: pass, gender: gent, ...rest } = user._doc

        res.cookie("access_token", token).status(200).json({ user: rest })


    } catch (error) {
        next(error)
    }
}
module.exports.signOut = async (req, res, next) => {
    try {
        res.cookie("access_token", "", { maxAge: 0 }).status(200).json({ message: "Logged out successfull" })
    } catch (error) {
        next(error)
    }
}