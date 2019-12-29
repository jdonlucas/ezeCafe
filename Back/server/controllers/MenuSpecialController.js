const MenuSpecial = require('../models').MenuSpecial;

var MenuSpecialController = {
    index(req, res) {
        return MenuSpecial.findAll()
            .then(specialList => res.status(200).json({ specialList }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const specialId = req.query.specialId;
        return MenuSpecial.findAll({
            where: {
                id: specialId,
            }
        })
            .then(order => res.status(200).json({ order }))
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let specialData = req.body.specialData;
        console.log(specialData);
        MenuSpecial.create(specialData).then(specialCreated => {
            res.json({ newMenuSpecial: specialCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let specialData = req.body.specialData;
        let query = { returning: true, where: { id: req.body.params.id } };
        MenuSpecial.update(specialData, query)
          .then(specialUpdated => {
            res.json({ newFood: specialUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let specialId = req.body.specialId;
        MenuSpecial.destroy({
            where: { id: specialId }
        })
            .then(specialDeleted => {
                res.json({ foodStatus: specialDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = MenuSpecialController;