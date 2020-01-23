const bulletinBoard = require('../models').bulletinBoard;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../models').User;

var NoticeController = {
    index(req, res) {
        let date = new Date()
        return bulletinBoard.findAll({
            where: {
                expiration: {
                    [Op.gt]: date,
                }
            },
            include: [
                {
                    model: User
                }
            ]
        })
            .then(noticeList => res.status(200).json({ noticeList }))
            .catch(error => res.status(400).send(error));
    },

    show(req, res) {
        const noticeId = req.body.noticeId;
        return bulletinBoard.findAll({
            where: {
                id: noticeId
            }
        })
            .then(notice => {
                res.json({ newNotice: notice });
              })
            .catch(error => res.status(400).send(error));
    },

    create(req, res,) {
        let noticeData = req.body.noticeData;
        bulletinBoard.create(noticeData).then(noticeCreated => {
            res.json({ newNotice: noticeCreated });
        }).catch(err => res.status(500).send(err));
    },

    update(req, res) {
        let noticeData = req.body.noticeData;
        let query = { returning: true, where: { id: req.body.params.id } };
        bulletinBoard.update(noticeData, query)
          .then(noticeUpdated => {
            res.json({ newNotice: noticeUpdated });
          })
          .catch(err => res.status(500).send(err));
    },
    
    delete(req, res) {
        let noticeId = req.body.noticeId;
        bulletinBoard.destroy({
            where: { id: noticeId }
        })
            .then(noticeDeleted => {
                res.json({ noticeStatus: noticeDeleted });
            })
            .catch(err => res.status(500).send(err));
    },

};

module.exports = NoticeController;