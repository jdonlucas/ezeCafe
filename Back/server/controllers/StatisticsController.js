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
                        [Op.gt]: date.subtract(1,'days').toDate(),
                        [Op.lt]: date.add(1,'days').toDate()
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
                        totalDay = 0.0;
                        startDate = moment(salesHistory[i].createdAt).format('HH');
                    }
                    if( (parseInt(moment(salesHistory[i].createdAt).format('H')) - 1) != parseInt(startDate) ) {
                        totalHour.push({ hour: (parseInt(moment(salesHistory[i].createdAt).format('H')) - 1) + ':00', total: 0 })
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


};

module.exports = StatisticsController;