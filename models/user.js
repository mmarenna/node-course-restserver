const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        require: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        require: [true, 'Password es obligatoria']
    },
    image: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','SELLER_ROLE','USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
})

UserSchema.methods.toJSON = function () {
    const {__v, password, ...user} = this.toObject();
    return user;
}


module.exports = model('User', UserSchema);