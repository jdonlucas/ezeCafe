let moment = require('moment');
moment.tz.setDefault('America/Mexico_City');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Sales = require('../models').Sales;
const StatusCaja = require('../models').StatusCaja;

var StatisticsController = {
    index(date) {
        let date = moment(date, 'DD-MM-YYYY');
        console.log(date)
        return Sales.findAll({
                where: {
                    createdAt: {
                        [Op.gt]: date.toDate(),
                        [Op.lt]: date.add(1,'M').toDate()
                    }
                }
            })
            .then(salesHistory => res.status(200).json({ salesHistory }))
            .catch(error => res.status(400).send(error));
    },
    showMonth(req,res) {
        let date = moment(req.body.date);
        console.log(date);
        date.month();
        date.format('DD-MM-YYYY')
        dateJson = this.index(date);
        console.log(date);
        console.log(dateJson);
        return res.json({ dateJson });
    }

};

module.exports = StatisticsController;