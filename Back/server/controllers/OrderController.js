const Order = require('../models').Order;

var OrderController = {
    index(req, res) {
        return Order.findAll()
            .then(orderHistory => res.status(200).json({ orderHistory }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const orderId = req.query.orderId;
        return Order.findAll({
            where: {
                id: orderId,
            }
        })
            .then(order => res.status(200).json({ order }))
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let orderData = req.body.orderData;
        Order.create(orderData).then(orderCreated => {
            res.json({ newOrder: orderCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
    },
    
    delete(req, res) {
        let orderId = req.body.orderId;
        Order.destroy({
            where: { id: orderId },
            truncate: true
        })
            .then(orderDeleted => {
                res.json({ orderStatus: orderDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = OrderController;