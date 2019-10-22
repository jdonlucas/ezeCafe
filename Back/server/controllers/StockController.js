const Consumibles = require('../models').Consumibles;

var StockController = {
    index(req, res) {
        return Consumibles.findAll()
            .then(stockList => res.status(200).json({ stockList }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const stockId = req.query.stockId;
        return Consumibles.findAll({
            where: {
                id: stockId,
            }
        })
            .then(stock => res.status(200).json({ stock }))
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let stockData = req.body.stockData;
        Consumibles.create(stockData).then(stockItemAdded => {
            res.json({ newStock: stockItemAdded });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let stockData = req.body.stockData;
        let query = { returning: true, where: { id: req.params.id } };
        Consumibles.update(stockData, query)
          .then(stockUpdated => {
            res.json({ newStock: stockUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let stockId = req.body.stockId;
        Consumibles.destroy({
            where: { id: stockId }
        })
            .then(stockDeleted => {
                res.json({ stock: stockDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = StockController;