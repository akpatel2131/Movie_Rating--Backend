const bcrypt = require("bcryptjs");
const User = require("../model/User");
const JWT = require("jsonwebtoken");

const register = async (data) => {
    try {
        // Destructuring the email from data
        const {email} = data;

        //find if user is already exist or not
        const userData = await User.findOne({ email });

        // throw error if user is already exist.
        if(userData) {
            throw new Error ("User is already exists")
        }

        // posting the data on user db.
        const user = new User(data);

        // Create salt for bcrypt the user password for security purpose
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);

        // replace the user password to hash password
        user.password = hashPassword;

        // save the updated user data;
        user.save();

        //return saved user object
        return user;

    }catch (error) {
        throw error;
    }
}

const login = async (data) => {

    try {

        const { email , password } = data;

        const userData = await User.findOne({ email });

        if(!userData) {
            throw new Error("User doesnot exist");
        }

        const checkPassword = await userData.comparePasswrod(password);

        if(!checkPassword) {
            throw new Error("Password doesnot match with registered password")
        }

        const token = await JWT.sign({ id: userData._id }, process.env.JWT_SECRET);

        return { token, userData }

    }catch (error) {
        throw error
    }

}


module.exports = {
    register,
    login,
}