const jwt = require('jsonwebtoken');
var dotenv = require('dotenv').config();
const UserController = require('./UserController');
const SharedController = require('./SharedController');

AuthController = {

    async signin(req, res) {
        const fullUser = await SharedController.getFullUserInfo(req.user.id);
        const token = AuthController.generateJwt(fullUser);
        res.json({ token });
    },

    async signup(req, res) {
        let userData = req.body.UserData;
        UserController.localCreate(userData).then(async userResult => {
            const status = userResult.id ? 200 : 500;
            if ( status === 200 ) {
                const fullUser = await SharedController.getFullUserInfo(userResult.dataValues.id);
                const token = AuthController.generateJwt(fullUser);
                return res.status(status).json({ token });
            }
            res.status(status).send(userResult);
        })
    },

    generateJwt(user) {
        return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '4h' });
    },
};

module.exports = AuthController;