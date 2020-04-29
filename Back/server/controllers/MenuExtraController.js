const MenuExtra = require('../models').MenuExtra;

var MenuExtraController = {
    index(req, res) {
        return MenuExtra.findAll({
            where: {
                status: 'active'
            }
        })
            .then(extraList => res.status(200).json({ extraList }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const extraId = req.query.extraId;
        return MenuExtra.findAll({
            where: {
                id: extraId,
            }
        })
            .then(order => res.status(200).json({ order }))
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let extraData = req.body.extraData;
        MenuExtra.create(extraData).then(extraCreated => {
            res.json({ newMenuExtra: extraCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let extraData = req.body.extraData;
        let query = { returning: true, where: { id: req.body.params.id } };
        MenuExtra.update(extraData, query)
          .then(extraUpdated => {
            res.json({ newExtra: extraUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let extraId = req.body.extraId;
        MenuExtra.destroy({
            where: { id: extraId }
        })
            .then(extraDeleted => {
                res.json({ extraStatus: extraDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = MenuExtraController;