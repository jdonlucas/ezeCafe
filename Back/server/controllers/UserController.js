const User = require('../models').User;
const Role = require('../models').Role;

var UserController = {
    index(req, res) {
        return User.findAll({
            include: [{ model: Role }]
        })
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
        let userData = req.body.userData;
        let query = { returning: true, where: { id: req.body.params.id } };
        User.update(userData, query)
          .then(userUpdated => {
            res.json({ newUserInfo: userUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let userId = req.body.userId;
        User.destroy({
            where: { id: userId }
        })
            .then(userDeleted => {
                res.json({ userStatus: userDeleted });
            })
            .catch(err => res.status(500).send(err));
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
