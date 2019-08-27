const User = require('../models').User;
const dotenv = require('dotenv').config();


var SharedController = {
    async getFullUserInfo(id) {
        let fullUser = {};
        const user = await User.findOne({ where: { id } });
        fullUser = SharedController.mergeObjects([
            user.dataValues
        ]);
        return fullUser;
    },

    mergeObjects(objectsArray) {
        let merge = {};
        objectsArray.map(object => {
            merge = { ...merge, ...object };
        });
        return merge;
    },
};

module.exports = SharedController;