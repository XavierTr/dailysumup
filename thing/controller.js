const {celebrate, Joi} = require('celebrate');
const conn = require('../db/conn');

exports.getDailyThings = function(req, res, next) {
    conn('thing').where({
        user_id: req.user_id, 
    })
    .where(conn.raw('DATE(`date`) = CURDATE()'))
    .orderBy('date', 'asc')
    .then(things => {
        res.json(things);
    })
    .catch(err => next(err));
}





exports.validate_addDailyThing = celebrate({
    body: Joi.object().keys({
        description: Joi.string().required().max(150),
        date: Joi.date().timestamp()
    })
})

exports.addDailyThing = function(req, res, next) {
    conn('thing').insert({
        user_id: req.user_id,
        description: req.body.description,
        date: req.body.date
    })
    .then(obj => {
        res.status(201).json({
            resource_id: obj[0]
        });
    })
    .catch(err => { next(err); })
}