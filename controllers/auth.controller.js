const { response } = require("express");
const bcryptjs = require('bcryptjs');


const { generateJWT } = require("../helpers/jwt-generator");
const { googleVerify } = require("../helpers/google-validation");
const User = require("../models/user");

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        //Verificar si el email existe
        const user = await User.findOne({email}); 
  
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

    

}

const googleSignIn = async(req, res = response) => {

    const { id_token} = req.body;

    try {
        const {name, picture, email} = await googleVerify(id_token);
        
        let usuario = await User.findOne({ email });
        
        if (!await User.findOne({ email })) {
            // Tengo que crearlo
            const data = {
                name,
                picture,
                email,
                password: ':P',
                google: true
            };
            usuario = new User( data );
            console.log(usuario);
            // await usuario.save();
        }

        
        if(!usuario.status) {
            res.status(401).json({
                msg: 'User not authorized!'
            })
        }

        console.log(usuario.id);
        const jwtToken = await generateJWT(usuario.id);
        
        res.json({
            usuario,
            jwtToken
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
} 


module.exports = {
    login,
    googleSignIn
}