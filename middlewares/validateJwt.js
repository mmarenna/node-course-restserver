const { response } = require('express');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req, res = response, next) => {

    const token = req.header('x-token');
    console.log(token);

    if (!token) {
        res.status(401).json({
            msg: 'No existe token en la peticion'
        })
    }

    try {

        const {uid} = jsonwebtoken.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);
        
        if (!user) {
            unauthorizedError('Usuario no existe en DB');
        }

        if (!user.status) {
            unauthorizedError('Token invalido - Usuario deshabilitado');
        }

        req.authenticatedUser = user;
        next();
    } catch (error) {
        unauthorizedError('Token invalido');
    }


    function unauthorizedError(message) {
        res.status(401).json({
            msg: message
        });
    }
}

module.exports = {
    validateJWT
}