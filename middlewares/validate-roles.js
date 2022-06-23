const { response } = require("express")


const isAdminRole = (req, res = response, next) => {

    if (!req.authenticatedUser) {
        return res.status(500);
    }

    const {rol, name} = req.authenticatedUser;

    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} no tiene el rol de administrador`
        });
    }

    next();

}

const hasRole = (...rols) => {

    return (req, res, next) => {
        console.log(rols, req.authenticatedUser.rol);

        if(!req.authenticatedUser || !rols.includes(req.authenticatedUser.rol)){
            return res.status(401).json({
                msg: `El usuario requiere uno de los siguientes roles: ${rols}`
            })
        }
        next();
    }

}

module.exports = {
    isAdminRole, hasRole
}