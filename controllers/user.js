const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function createToken(user, SECRET_KEY, expiresIn) {
    const {id, name, email, username} = user;
    const payload = {
        id, name, email, username
    };
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

async function register(input) {
    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const {email, username, password} = newUser;

    // validate unique email
    const foundEmail = await User.findOne({email});
    if (foundEmail) throw new Error('email exist!')

    // validate exist username
    const foundUsername = await User.findOne({username});
    if (foundUsername) throw new Error('username exist!')

    // encrypt the password
    const salt = await bcrypt.genSaltSync(10);
    newUser.password = await bcrypt.hash(password, salt);

    try {
        const user = new User(newUser);
        user.save();
        return user;
    } catch (error) {
        console.error(error);
    }
}

async function login(input) {
    const {email, password} = input;

    const userFound = await User.findOne({email: email.toLowerCase()})
    if (!userFound) throw new Error('error in email or password');
    console.log(userFound);

    const passwordSuccess = await bcrypt.compare(password, userFound.password);
    console.log(passwordSuccess);
    if (!passwordSuccess) throw new Error('error in email or password');
    return {
        token: createToken(userFound, process.env.SECRET_KEY, '24h')
    };
}


module.exports = {
    register,
    login
}
