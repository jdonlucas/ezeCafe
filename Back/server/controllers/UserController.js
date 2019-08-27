const User = require('../models').User;

var UserController = {
    index(req, res) {
        return User.findAll()
            .then(usersList => res.status(200).json({ usersList }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {

    },

    create(req, res,) {
        let userData = req.body.userData;
        UserController.localCreate(userData).then(userCreated => {
            res.json({ newUser: userCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {

    },
    
    delete(req, res) {

    },

    async localCreate(userData) {
        user = await User.create(userData).then(async userCreated => {
            return userCreated;
        }).catch(err => {return err;});
        if(user.id) {
            await user.save();
        }
        return user;
    },

};

module.exports = UserController;