const MenuFood = require('../models').MenuFood;

var MenuFoodController = {
    index(req, res) {
        return MenuFood.findAll()
            .then(foodList => res.status(200).json({ foodList }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const foodId = req.query.foodId;
        return MenuFood.findAll({
            where: {
                id: foodId,
            }
        })
            .then(order => res.status(200).json({ order }))
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let foodData = req.body.foodData;
        MenuFood.create(foodData).then(foodCreated => {
            res.json({ newMenuFood: foodCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let foodData = req.body.foodData;
        let query = { returning: true, where: { id: req.params.id } };
        MenuFood.update(foodData, query)
          .then(foodUpdated => {
            res.json({ newFood: foodUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let foodId = req.body.foodId;
        MenuFood.destroy({
            where: { id: foodId },
            truncate: true
        })
            .then(foodDeleted => {
                res.json({ foodStatus: foodDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = MenuFoodController;