const Insumos = require('../models').Insumos;

var InsumosController = {
    index(req, res) {
        return Insumos.findAll()
            .then(insumosList => res.status(200).json({ insumosList }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const insumosId = req.query.insumosId;
        return Insumos.findAll({
            where: {
                id: insumosId,
            }
        })
            .then(insumos => res.status(200).json({ insumos }))
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let insumosData = req.body.insumosData;
        Insumos.create(insumosData).then(insumosItemAdded => {
            res.json({ newInsumos: insumosItemAdded });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let insumosData = req.body.insumosData;
        let query = { returning: true, where: { id: req.params.id } };
        Insumos.update(insumosData, query)
          .then(insumosUpdated => {
            res.json({ newinsumos: insumosUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let insumosId = req.body.insumosId;
        Insumos.destroy({
            where: { id: insumosId },
            truncate: true
        })
            .then(insumosDeleted => {
                res.json({ insumos: insumosDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = InsumosController;