let moment = require('moment');
moment.tz.setDefault('America/Mexico_City');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Sales = require('../models').Sales;

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
                        [Op.lte]: end.toDate()
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

};

module.exports = StatisticsController;