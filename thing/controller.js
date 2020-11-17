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

exports.authorize_getDailyThing = (req, res, next) => {
    conn('thing').where('id', req.params.id)
    .then(obj => {
        if(obj.length === 1) {
            if(obj[0].user_id === req.user_id){
                //Save the result in the request
                req.tempRes = obj[0];
                next();
            }
            else {
                res.sendStatus(404);
            }
        }
        else {
            res.sendStatus(404);
        }
    })
    .catch(err => next(err));
}

exports.getDailyThing = (req, res, next) => {
    res.json(req.tempRes);    
}