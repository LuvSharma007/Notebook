const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.static('matchPassword', async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        try {
            const token = jwt.sign({ email: user.email, fullName: user.fullName,_id: user._id },"$uperman007",{ algorithm: 'HS256', expiresIn: '1h' });
            return token;
        } catch (err) {
            console.log(`Error while signing token: ${err}`);
            return null;
        }
    } else {
        return null;
    }
});

const user = mongoose.model('user', userSchema)

module.exports = user;