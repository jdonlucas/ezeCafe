let moment = require('moment');
moment.tz.setDefault('America/Mexico_City');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Order = require('../models').Order;
const FoodOrder = require('../models').FoodOrder;
const BeverageOrder = require('../models').BeveragesOrder;
const specialOrder = require('../models').specialOrder;
const extraOrder = require('../models').extraOrder;
const MenuFood = require('../models').MenuFood;
const MenuBeveragesSpecific = require('../models').MenuBeveragesSpecific;
const MenuBeverages = require('../models').MenuBeverages;
const MenuSpecial = require('../models').MenuSpecial;
const MenuExtra = require('../models').MenuExtra;
const User = require('../models').User;
const Sales = require('../models').Sales;

var OrderController = {
    index(req, res) {
        let date = moment(req.body.date, 'DD-MM-YYYY');
        return Order.findAll({ 
            where: {
                createdAt: {
                    [Op.gt]: date.format(),
                    [Op.lt]: date.add(1,'days').format()
                }
            },
            include: [
                {
                    model: User
                },
                {
                    model: Sales
                }
        ]})
            .then(orderHistory => res.status(200).json({ orderHistory }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const orderId = req.body.orderId;
        return Order.findAll({
            where: {
                id: orderId,
            },
            include: [
                {
                    model: MenuFood,
                    as: 'food'
                },
                {
                    model: MenuBeveragesSpecific,
                    as: 'beverages',
                    include: [
                        {
                            model: MenuBeverages,
                            as: 'beverage',
                            attributes: ['product']
                        }
                    ]
                },
                {
                    model: MenuSpecial,
                    as: 'special'
                },
                {
                    model: MenuExtra,
                    as: 'extra'
                },
                {
                    model: User
                },
                {
                    model: Sales
                }
            ]
        })
            .then(order => res.status(200).json(order))
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
    createSpecial(req,res) {
        let specialData = req.body.specialData;
        specialOrder.create(specialData).then(specialOrderCreated => {
            res.json({newSpecialOrder: specialOrderCreated});
        }).catch(err => res.status(500).send(err));
    },
    createExtra(req,res) {
        let extraData = req.body.extraData;
        extraOrder.create(extraData).then(extraOrderCreated => {
            res.json({newExtraOrder: extraOrderCreated});
        }).catch(err => res.status(500).send(err));
    },
    updateFoodOrder(req,res) {
        let orderFoodData = req.body.foodData;
        let query = { where: { id: req.body.params.id }};
        FoodOrder.update(orderFoodData, query)
            .then(foodOrderUpdated => {
                res.json({ newFood: foodOrderUpdated })
            })
            .catch(err => res.status(500).send(err));
    },
    updateBeverageOrder(req,res) {
        let beverageOrder = req.body.beverageOrder;
        let query = { where: { id: req.body.params.id }};
        BeverageOrder.update(beverageOrder, query)
            .then(beverageOrder => {
                res.json({ newBeverage: beverageOrder })
            })
            .catch(err => res.status(500).send(err));
    },
    updateSpecialOrder(req,res) {
        let orderSpecialData = req.body.specialData;
        let query = { where: { id: req.body.params.id }};
        specialOrder.update(orderSpecialData, query)
            .then(specialOrderUpdated => {
                res.json({ newSpecial: specialOrderUpdated })
            })
            .catch(err => res.status(500).send(err));
    },
    updateExtraOrder(req,res) {
        let orderExtraData = req.body.extraData;
        let query = { where: { id: req.body.params.id }};
        extraOrder.update(orderExtraData, query)
            .then(extraOrderUpdated => {
                res.json({ newExtra: extraOrderUpdated })
            })
            .catch(err => res.status(500).send(err));
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