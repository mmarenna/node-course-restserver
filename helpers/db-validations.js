const Role = require('../models/role')
const User = require('../models/user');

const validRole = async(rol = '') => {
    const rolExists = await Role.findOne({rol})
    if (!rolExists)  {
        throw new Error(`El rol ${rol}, no esta dentro de los roles permitidos`);
    }
}

const validateDuplicatedEmail = async(email = '') => {
    const emailExist = await User.findOne({email});
    if (emailExist!==null) {
        throw new Error(`El email ${email} ya existe en los usuarios registrados`);
    }
}

const validateId = async(id ) => {
    const idIsPresent = await User.findById(id);
    if (!idIsPresent) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    validRole,
    validateDuplicatedEmail,
    validateId
}