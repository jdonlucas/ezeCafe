const MenuBeverages = require('../models').MenuBeverages;
const MenuBeveragesSpecific = require('../models').MenuBeveragesSpecific;

var MenuBeveragesController = {
    index(req, res) {
        return MenuBeverages.findAll()
            .then(menuBeverages => res.status(200).json({ menuBeverages }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const beverageId = req.query.beverageId;
        return MenuBeverages.findAll({
            where: {
                id: beverageId,
            }
        })
            .then(beverage => res.status(200).json({ beverage }))
            .catch(error => res.status(400).send(error));
    },
    showSpecific(req, res) {
        const specificId = req.query.beverageId;
        return MenuBeveragesSpecific.findAll({
            where: {
                '$MenuBeverages.id$': specificId 
            },
            include: [
                {model: MenuBeverages, as: MenuBeverages.tableName}
            ]
        });
    },

    create(req, res) {
        let beverageData = req.body.beverageData;
        MenuBeverages.create(beverageData).then(beverageCreated => {
            res.json({ newBeverage: beverageCreated });
        }).catch(err => res.status(500).send(err));
    },
    createSpecific(req,res) {
        let beverageData = req.body.beverageData;
        MenuBeveragesSpecific.create(beverageData).then(specificCreated => {
            res.json({ newSpecific: specificCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let beverageData = req.body.beverageData;
        let query = { returning: true, where: { id: req.params.id } };
        MenuBeverages.update(beverageData, query)
          .then(beverageUpdated => {
            res.json({ newBeverageData: beverageUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    updateSpecific(req,res) {
        let beverageData = req.body.beverageData;
        let query = { returning: true, where: {
            '$MenuBeverages.id$': req.params.id 
        },
        include: [
            {model: MenuBeverages, as: MenuBeverages.tableName}
        ]};
        MenuBeveragesSpecific.update(beverageData, query)
            .then(specificUpdated => {
                res.json({ newSpecificData: specificUpdated });
            })
            .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let beverageId = req.body.beverageId;
        MenuBeverages.destroy({
            where: { id: beverageId }
        })
            .then(beverageDeleted => {
                res.json({ beverageStatus: beverageDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = MenuBeveragesController;