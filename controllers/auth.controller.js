const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');
const { generateJWT } = require("../helpers/jwt-generator");

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        //Verificar si el email existe
        const user = await Usuario.findOne({email}); 
  
        //Verificar si esta activo
        if(!user || user.status === false) {
            badRequestFormaterResponse('El usuario no existe');
        }

        //validar la contraseña
        const validPasswrod = bcryptjs.compareSync(password, user.password);
        if(!validPasswrod) {
            badRequestFormaterResponse('El password es invalido');
        }
        //Generar el JWT
        const jwtToken = await generateJWT(user.id);
        
        res.json({
            user,
            jwtToken
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msgException: 'algo salio mal!!'
        })
    }

    function badRequestFormaterResponse( message ) {
        res.status(400).json({
            msg: message
        });
    }
}


module.exports = {
    login
}