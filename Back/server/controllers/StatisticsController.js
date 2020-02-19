let moment = require('moment');
moment.tz.setDefault('America/Mexico_City');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Sales = require('../models').Sales;
const StatusCaja = require('../models').StatusCaja;

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
                }
            })
            .then(salesHistory => {
                for(let i=0;i<salesHistory.length;i++) {
                    salesHistory[i].costo
                }
            })
            .catch(error => res.status(400).send(error));
        

    },

};

module.exports = StatisticsController;