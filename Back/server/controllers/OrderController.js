const Order = require('../models').Order;
const FoodOrder = require('../models').FoodOrder;
const BeverageOrder = require('../models').BeveragesOrder;

var OrderController = {
    index(req, res) {
        return Order.findAll()
            .then(orderHistory => res.status(200).json({ orderHistory }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const orderId = req.body.orderId;
        console.log(orderId)
        return Order.findAll({
            where: {
                id: orderId,
            },
            include: [
                {
                    model: FoodOrder,
                    as: 'food'
                },
                {
                    model: BeveragesOrder,
                    as: 'beverages'
                }
            ]
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
    createFood(req,res) {
        let foodData = req.body.foodData;
        FoodOrder.create(foodData).then(foodOrderCreated => {
            res.json({newFoodOrder: foodOrderCreated});
        }).catch(err => res.status(500).send(err));
    },
    createBeverage(req,res) {
        let beverageData = req.body.beverageData;
        BeverageOrder.create(beverageData).then(beverageCrated => {
            res.json({newBeverageOrder: beverageCrated});
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let orderData = req.body.orderData;
        let query = { where: { id: req.body.params.id } };
        Order.update(orderData, query)
          .then(orderUpdated => {
            res.json({ newOrder: orderUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let orderId = req.body.orderId;
        Order.destroy({
            where: { id: orderId }
        })
            .then(orderDeleted => {
                res.json({ orderStatus: orderDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = OrderController;