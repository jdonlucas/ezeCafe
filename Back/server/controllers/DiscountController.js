const discount = require('../models').discount;
const discountOrder = require('../models').discountOrder;
const Order = require('../models').Order;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    async check(req,res) {
        let today = new Date();
        let discountId = req.body.discountId;
        let employeeId = req.body.employeeId;
        const hasBeenUsed = await discountOrder.findOne({ where: {discountId: discountId,
            createdAt: {
                [Op.gte]: today.setHours(0,0,0,0)
            }
        }})
        let byThisUser = null;
        if(hasBeenUsed) {
            byThisUser = await Order.findOne({ where: { id: hasBeenUsed.orderId,
                UserId: employeeId} })
        }
        return res.json({ discountUsed: byThisUser ? true : false })
    }

};

module.exports = DiscountController;