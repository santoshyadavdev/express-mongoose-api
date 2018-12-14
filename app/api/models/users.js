const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
});

// UserSchema.pre('save', (next) => {
//     var user= this;
//     console.log(user);
//     console.log(user.password);
//     this.password = bcrypt.hashSync(this.password, saltRounds);
//     console.log(this.password);
//     next();
// });

module.exports = mongoose.model('User', UserSchema);
