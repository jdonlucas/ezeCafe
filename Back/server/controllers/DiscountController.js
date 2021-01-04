const discount = require('../models').discount;

var DiscountController = {
    index(req, res) {
        return discount.findAll({
            where: {
                status: 'active'
            }
        })
            .then(discountList => res.status(200).json({ discountList }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const discountId = req.query.discountId;
        return discount.findAll({
            where: {
                id: discountId,
            }
        })
            .then(orderDiscount => res.status(200).json({ orderDiscount }))
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let discountData = req.body.discountData;
        discount.create(discountData).then(discountCreated => {
            res.json({ newDiscount: discountCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let discountData = req.body.discountData;
        let query = { returning: true, where: { id: req.body.params.id } };
        discount.update(discountData, query)
          .then(discountUpdated => {
            res.json({ newDiscount: discountUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let discountId = req.body.discountId;
        discount.destroy({
            where: { id: discountId }
        })
            .then(discountDeleted => {
                res.json({ discountStatus: discountDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = DiscountController;