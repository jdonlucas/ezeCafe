const Sales = require('../models').Sales;
const StatusCaja = require('../models').StatusCaja;

var SalesController = {
    index(req, res) {
        return Sales.findAll()
            .then(salesHistory => res.status(200).json({ salesHistory }))
            .catch(error => res.status(400).send(error));
    },
    indexStatusCaja(req, res) {
        return StatusCaja.findAll()
            .then(cajaHistory => res.status(200).json({ cajaHistory }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const saleId = req.query.saleId;
        return Sales.findAll({
            where: {
                id: saleId,
            }
        })
            .then(sale => res.status(200).json({ sale }))
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let salesData = req.body.salesData;
        Sales.create(salesData).then(saleCreated => {
            res.json({ newSale: saleCreated });
        }).catch(err => res.status(500).send(err));
    },
    createStatusCaja(req, res,) {
        let cajaData = req.body.cajaData;
        StatusCaja.create(cajaData).then(cajaCreated => {
            res.json({ newCajaStatus: cajaCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let salesData = req.body.salesData;
        let query = { where: { id: req.body.params.id } };
        Sales.update(salesData, query)
          .then(salesUpdated => {
            res.json({ newSale: salesUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    updateStatusCaja(req, res) {
        let cajaData = req.body.cajaData;
        let query = { where: { id: req.body.params.id } };
        StatusCaja.update(cajaData, query)
          .then(salesUpdated => {
            res.json({ newCaja: cajaUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let saleId = req.body.saleId;
        Sales.destroy({
            where: { id: saleId }
        })
            .then(saleDeleted => {
                res.json({ saleStatus: saleDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = SalesController;