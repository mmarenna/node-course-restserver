const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUserByName = async(req, res) => {

    const { name } = req.params;

    const user = await User.findOne({name});
    console.log(user);
    res.json({
        user
    })

}

const getUser = async(req, res = require('express').response) => {

    // const {name, last_name, apikey = 0} = req.query;
    // const users = await User.find();
    const {limit = 5, from = 0} = req.query;
    const filterDisabledQuery = {status: true};
    
    // const users = await User.find(filterDisabledQuery)
    //     .skip(Number(from))
    //     .limit(Number(limit));
    // const totalUsers = await User.countDocuments(filterDisabledQuery);

    //Disparo las promises de manera simultanea
    const [totalUsers, users] = await Promise.all([
        User.countDocuments(filterDisabledQuery),
        User.find(filterDisabledQuery)
        .skip(Number(from))
        .limit(Number(limit))
    ])
    
        
    res.json({
        totalUsers, 
        users
        // totalUsers,
        // users
    })
};

const postUser = async(req, res) => {

    const {name, password, email, rol} = req.body;

    const user = new User({name, email, rol});

    //Encript pass
    const salt = bcryptjs.genSaltSync();   
    user.password = bcryptjs.hashSync(password, salt);
    

    //Save user in database
    await user.save();

    res.status(201).json({
        user
    })
};

const putUser =  async(req, res) => {
    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();   
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, rest);

    res.json({
        updatedUser
    })
};

const deleteUser =  async(req, res) => {

    const { id } = req.params
    //Borrado fisicamente
    // const deletedUser = await User.findByIdAndDelete(id);
    const deletedUser = await User.findByIdAndUpdate(id, {status: false});
    
    res.json({
        id,
        deletedUser
    })
};



module.exports = {getUser, postUser, putUser, deleteUser, getUserByName};