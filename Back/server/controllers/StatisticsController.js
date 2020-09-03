let moment = require('moment');
moment.tz.setDefault('America/Mexico_City');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Sales = require('../models').Sales;
const Food = require('../models').MenuFood;
const Drink = require('../models').MenuBeverages;
const DrinkSpecific = require('../models').MenuBeveragesSpecific;
const FoodOrder = require('../models').FoodOrder;
const DrinkOrder = require('../models').BeveragesOrder;
const Extra = require('../models').MenuExtra;
const ExtraOrder = require('../models').extraOrder;

var StatisticsController = {
    showMonth(req,res) {
        let date = moment(req.body.date, 'DD-MM-YYYY');
        date.startOf('month').format('DD-MM-YYYY');
        return Sales.findAll({
                where: {
                    createdAt: {
                        [Op.gt]: date.toDate(),
                        [Op.lt]: date.add(1,'M').toDate()
                    }
                },
                order: [ ['createdAt', 'ASC'] ]
            })
            .then(salesHistory => {
                let totalDay = 0.0;
                let startDate = moment(salesHistory[0].createdAt).format('D');
                let totalMonth = [];
                for(let i=0;i<salesHistory.length;i++) {
                    if (moment(salesHistory[i].createdAt).format('D') != startDate) {
                        totalMonth.push({ day: startDate, total: totalDay })
                        totalDay = 0.0;
                        startDate = moment(salesHistory[i].createdAt).format('D');
                    }
                    totalDay += salesHistory[i].costo;
                }
                totalMonth.push({ day: startDate, total: totalDay })
                res.status(200).json( totalMonth )
            })
            .catch(error => res.status(400).send(error));
        

    },
    showWeek(req,res) {
        let start = moment(req.body.start, 'DD-MM-YYYY');
        let end = moment(req.body.end, 'DD-MM-YYYY');
        return Sales.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: start.toDate(),
                        [Op.lte]: end.add(1,'days').toDate()
                    }
                },
                order: [ ['createdAt', 'ASC'] ]
            })
            .then(salesHistory => {
                let totalDay = 0.0;
                let startDate = moment(salesHistory[0].createdAt).format('D');
                let dateName = moment(salesHistory[0].createdAt).locale('es').format('dddd');
                let totalWeek = [];
                for(let i=0;i<salesHistory.length;i++) {
                    if (moment(salesHistory[i].createdAt).format('D') != startDate) {
                        totalWeek.push({ day: dateName + ' ' + startDate , total: totalDay })
                        totalDay = 0.0;
                        startDate = moment(salesHistory[i].createdAt).format('D');
                        dateName = moment(salesHistory[i].createdAt).locale('es').format('dddd');
                    }
                    totalDay += salesHistory[i].costo;
                }
                totalWeek.push({ day: dateName + ' ' + startDate, total: totalDay })
                res.status(200).json( totalWeek )
            })
            .catch(error => res.status(400).send(error));
        

    },
    getYears(req,res) {
        return Sales.findAll({attributes: ['createdAt']}).then(sales => {
            let years = [];
            for(let i=0;i<sales.length;i++) {
                if( ! years.includes(parseInt(moment(sales[i]).format('YYYY'))) ) {
                    years.push(parseInt(moment(sales[i]).format('YYYY')));
                }
            }
            res.status(200).json( years )
        })
        .catch(error => res.status(400).send(error));
    },
    showDay(req,res) {
        let date = moment(req.body.date, 'DD-MM-YYYY');
        return Sales.findAll({
                where: {
                    createdAt: {
                        [Op.gt]: date.toDate(),
                        [Op.lt]: date.add(1,'d').toDate()
                    }
                },
                order: [ ['createdAt', 'ASC'] ]
            })
            .then(salesHistory => {
                let totalDay = 0.0;
                let startDate = moment(salesHistory[0].createdAt).format('HH');
                let totalHour = [];
                for(let i=0;i<salesHistory.length;i++) {
                    if (moment(salesHistory[i].createdAt).format('HH') != startDate) {
                        totalHour.push({ hour: startDate + ':00', total: totalDay })
                        if( (parseInt(moment(salesHistory[i].createdAt).format('H')) - 1) != parseInt(startDate) ) {
                            let future = parseInt(moment(salesHistory[i].createdAt).format('H'));
                            let past = parseInt(startDate);
                            let diff = future - past;
                            for (let j=diff-1;j>0;j--) {
                                totalHour.push({ hour: (parseInt(moment(salesHistory[i].createdAt).format('H')) - j) + ':00', total: 0 })
                            }
                        }
                        totalDay = 0.0;
                        startDate = moment(salesHistory[i].createdAt).format('HH');
                    }
                    totalDay += salesHistory[i].costo;
                }
                totalHour.push({ hour: startDate + ':00', total: totalDay })
                res.status(200).json( totalHour )
            })
            .catch(error => res.status(400).send(error));
    },
    showYear(req,res) {
        let date = moment(req.body.date).format('YYYY');
        let less = parseInt(date) - 1;
        let more = parseInt(date) + 1;
        console.log(date, less, more)
        return Sales.findAll({
                where: {
                    createdAt: {
                        [Op.gt]: new Date('12-31-' + less),
                        [Op.lt]: new Date('01-01-' + more)
                    }
                },
                order: [ ['createdAt', 'ASC'] ]
            })
            .then(salesHistory => {
                let totalDay = 0.0;
                let startDate = moment(salesHistory[0].createdAt).locale('es').format('MMMM');
                let totalHour = [];
                for(let i=0;i<salesHistory.length;i++) {
                    if (moment(salesHistory[i].createdAt).locale('es').format('MMMM') != startDate) {
                        totalHour.push({ month: startDate, total: totalDay })
                        totalDay = 0.0;
                        startDate = moment(salesHistory[i].createdAt).locale('es').format('MMMM');
                    }
                    totalDay += salesHistory[i].costo;
                }
                totalHour.push({ month: startDate, total: totalDay })
                res.status(200).json( totalHour )
            })
            .catch(error => res.status(400).send(error));
        

    },

    getFood(req,res){
        let option = req.body.option;
        Food.findAll({
            attributes: ['id','product','price']
        }).then(response => { 
            let foods = response 
            if (option == 'month') {
                let date = moment(req.body.date, 'DD-MM-YYYY');
                date.startOf('month').format('DD-MM-YYYY');
                return FoodOrder.findAll({
                    where: {
                        createdAt: {
                            [Op.gt]: date.toDate(),
                            [Op.lt]: date.add(1,'M').toDate()
                        }
                    },
                    order: [ ['createdAt', 'ASC'] ]
                })
                .then(salesHistory => {
                    let foodSales = [];
                    let item;
                    for(let i=0;i<foods.length;i++) {
                        item = salesHistory.filter(x => {
                            return x.foodId == foods[i].id
                        })
                        let price = item.length * foods[i].price;
                        foodSales.push({'product': foods[i].product, 'quantity': item.length, 'sale': price})
                    }     
                    res.status(200).json(foodSales)             
                })
                .catch(err => res.status(400).send(err))
            } else if (option == 'year') {
                let date = moment(req.body.date).format('YYYY');
                let less = parseInt(date) - 1;
                let more = parseInt(date) + 1;
                return FoodOrder.findAll({
                        where: {
                            createdAt: {
                                [Op.gt]: new Date('12-31-' + less),
                                [Op.lt]: new Date('01-01-' + more)
                            }
                        },
                        order: [ ['createdAt', 'ASC'] ]
                    })
                    .then(salesHistory => {
                        let foodSales = [];
                        let item;
                        for(let i=0;i<foods.length;i++) {
                            item = salesHistory.filter(x => {
                                return x.foodId == foods[i].id
                            })
                            let price = item.length * foods[i].price;
                            foodSales.push({'product': foods[i].product, 'quantity': item.length, 'sale': price})
                        }     
                        res.status(200).json(foodSales)             
                    })
                    .catch(err => res.status(400).send(err))
            } else if (option == 'day') {
                let date = moment(req.body.date, 'DD-MM-YYYY');
                return FoodOrder.findAll({
                        where: {
                            createdAt: {
                                [Op.gt]: date.toDate(),
                                [Op.lt]: date.add(1,'d').toDate()
                            }
                        },
                        order: [ ['createdAt', 'ASC'] ]
                    })
                    .then(salesHistory => {
                        let foodSales = [];
                        let item;
                        for(let i=0;i<foods.length;i++) {
                            item = salesHistory.filter(x => {
                                return x.foodId == foods[i].id
                            })
                            let price = item.length * foods[i].price;
                            foodSales.push({'product': foods[i].product, 'quantity': item.length, 'sale': price})
                        }     
                        res.status(200).json(foodSales)         
                    })
                    .catch(err => res.status(400).send(err))
            } else if (option == 'week') {
                let start = moment(req.body.date.start, 'DD-MM-YYYY');
                let end = moment(req.body.date.end, 'DD-MM-YYYY');
                return FoodOrder.findAll({
                        where: {
                            createdAt: {
                                [Op.gte]: start.toDate(),
                                [Op.lte]: end.toDate()
                            }
                        },
                        order: [ ['createdAt', 'ASC'] ]
                    })
                    .then(salesHistory => {
                        let foodSales = [];
                        let item;
                        for(let i=0;i<foods.length;i++) {
                            item = salesHistory.filter(x => {
                                return x.foodId == foods[i].id
                            })
                            let price = item.length * foods[i].price;
                            foodSales.push({'product': foods[i].product, 'quantity': item.length, 'sale': price})
                        }     
                        res.status(200).json(foodSales)         
                    })
                    .catch(err => res.status(400).send(err))
            }

        })
    },
    getDrink(req,res) {
        let option = req.body.option;
        DrinkSpecific.findAll({
            where: {
                status: 'active'
            },
            attributes: ['id','type','price'],
            include: [
                {
                    model: Drink,
                    as: 'beverage',
                    attributes: ['product']
                }
            ]
        })
        .then(response => { 
            let drinks = response;
            if (option == 'month') {
                let date = moment(req.body.date, 'DD-MM-YYYY');
                date.startOf('month').format('DD-MM-YYYY');
                return DrinkOrder.findAll({
                    where: {
                        createdAt: {
                            [Op.gt]: date.toDate(),
                            [Op.lt]: date.add(1,'M').toDate()
                        }
                    },
                    order: [ ['createdAt', 'ASC'] ]
                })
                .then(salesHistory => {
                    let drinkSales = [];
                    let item;
                    for(let i=0;i<drinks.length;i++) {
                        item = salesHistory.filter(x => {
                            return x.beveragesId == drinks[i].id
                        })
                        let price = item.length * drinks[i].price;
                        drinkSales.push({'product': drinks[i].beverage.product + " " + drinks[i].type, 'quantity': item.length, 'sale': price})
                    }     
                    res.status(200).json(drinkSales)             
                })
                .catch(err => res.status(400).send(err))
            } else if (option == 'year') {
                let date = moment(req.body.date).format('YYYY');
                let less = parseInt(date) - 1;
                let more = parseInt(date) + 1;
                return DrinkOrder.findAll({
                        where: {
                            createdAt: {
                                [Op.gt]: new Date('12-31-' + less),
                                [Op.lt]: new Date('01-01-' + more)
                            }
                        },
                        order: [ ['createdAt', 'ASC'] ]
                    })
                    .then(salesHistory => {
                        let drinkSales = [];
                        let item;
                        for(let i=0;i<drinks.length;i++) {
                            item = salesHistory.filter(x => {
                                return x.beveragesId == drinks[i].id
                            })
                            let price = item.length * drinks[i].price;
                            drinkSales.push({'product': drinks[i].beverage.product + " " + drinks[i].type, 'quantity': item.length, 'sale': price})
                        }     
                        res.status(200).json(drinkSales)             
                    })
                    .catch(err => res.status(400).send(err))
            } else if (option == 'day') {
                let date = moment(req.body.date, 'DD-MM-YYYY');
                return DrinkOrder.findAll({
                        where: {
                            createdAt: {
                                [Op.gt]: date.toDate(),
                                [Op.lt]: date.add(1,'d').toDate()
                            }
                        },
                        order: [ ['createdAt', 'ASC'] ]
                    })
                    .then(salesHistory => {
                        let drinkSales = [];
                        let item;
                        for(let i=0;i<drinks.length;i++) {
                            item = salesHistory.filter(x => {
                                return x.beveragesId == drinks[i].id
                            })
                            let price = item.length * drinks[i].price;
                            drinkSales.push({'product': drinks[i].beverage.product + " " +drinks[i].type, 'quantity': item.length, 'sale': price})
                        }     
                        res.status(200).json(drinkSales)         
                    })
                    .catch(err => res.status(400).send(err))
            } else if (option == 'week') {
                let start = moment(req.body.date.start, 'DD-MM-YYYY');
                let end = moment(req.body.date.end, 'DD-MM-YYYY');
                return DrinkOrder.findAll({
                        where: {
                            createdAt: {
                                [Op.gte]: start.toDate(),
                                [Op.lte]: end.toDate()
                            }
                        },
                        order: [ ['createdAt', 'ASC'] ]
                    })
                    .then(salesHistory => {
                        let drinkSales = [];
                        let item;
                        for(let i=0;i<drinks.length;i++) {
                            item = salesHistory.filter(x => {
                                return x.beveragesId == drinks[i].id
                            })
                            let price = item.length * drinks[i].price;
                            drinkSales.push({'product': drinks[i].beverage.product + " " + drinks[i].type, 'quantity': item.length, 'sale': price})
                        }     
                        res.status(200).json(drinkSales)         
                    })
                    .catch(err => res.status(400).send(err))
            }
        })
    },
    stickersSales(req,res) {
        Extra.findAll({
            where: {
                type: 'otros',
                [Op.or]: [
                    {
                        product: {
                            [Op.like]: '%Stikers%'
                        }
                    },
                    {
                        product: {
                            [Op.like]: '%Separadores%'
                        }
                    }
                ]
            },
            attributes: ['id','product','price'],
        })
        .then(response => { 
            let stickers = response;
            let date = moment(req.body.date, 'DD-MM-YYYY');
            date.startOf('month').format('DD-MM-YYYY');
            return ExtraOrder.findAll({
                where: {
                    createdAt: {
                        [Op.gt]: date.toDate(),
                        [Op.lt]: date.add(1,'M').toDate()
                    }
                },
                order: [ ['createdAt', 'ASC'] ]
            })
            .then(salesHistory => {
                let karlaSales = 0;
                let karlaAmount = 0.0;
                let sebasSales = 0;
                let sebasAmount = 0.0;
                let stickersSale = [];
                let item;
                for(let i=0;i<stickers.length;i++) {
                    if (stickers[i].product.includes('donlucasart') || stickers[i].product.includes('lasharly')) {
                        item = salesHistory.filter(x => {
                            return x.extraId == stickers[i].id
                        })
                        let price = item.length * stickers[i].price;
                        karlaAmount += price;
                        karlaSales += item.length;
                    } else if (stickers[i].product.toLowerCase().includes('sebas')) {
                        item = salesHistory.filter(x => {
                            return x.extraId == stickers[i].id
                        })
                        let price = item.length * stickers[i].price;
                        sebasAmount += price;
                        sebasSales += item.length;
                    }
                }
                stickersSale.push({'karla': karlaSales, 'karlaAmount': karlaAmount, 'sebas': sebasSales, 'sebasAmount': sebasAmount})
                res.status(200).json(stickersSale)             
            })
            .catch(err => res.status(400).send(err))
        })
    }

};

module.exports = StatisticsController;