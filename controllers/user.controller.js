

const getUser = (req, res = require('express').response) => {

    const {name, last_name, apikey = 0} = req.query;
    
    res.json({
        message: "Hola mundo - Controller",
        name, last_name, apikey
    })
};

const postUser = (req, res) => {
    const {name, age} = req.body;
    res.status(201).json({
        message: "Hola mundo POST - Controller",
        name,
        age
    })
};

const putUser =  (req, res) => {
    const {id} = req.params;
    res.json({
        message: "Hola mundo OK - Controller", id
    })
};

const deleteUser =  (req, res) => {
    res.json({
        message: "Hola mundo OK Delete - Controller "
    })
};



module.exports = {getUser, postUser, putUser, deleteUser};