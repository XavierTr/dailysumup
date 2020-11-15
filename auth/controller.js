const {celebrate, Joi} = require('celebrate');
const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt');

const conn = require('../db/conn');
const JwtAuth = require('./middleware/JwtAuth');





exports.authentication_test = function (req, res, next) {
    JwtAuth(req, res, () => {res.sendStatus(200);});
} 





exports.validate_authenticate = celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
})

exports.authenticate = async function (req, res, next) {
    
    user = conn('user').where('email', req.body.email)
    .then(r => {
        if(r.length === 1) {

            const hash = r[0].pass_hash;
            const userId = r[0].id;
            bCrypt.compare(req.body.password, hash, function(err, result){
                if(err) {
                    next(err);
                }
                else if(result === false) {
                    res.sendStatus(401);
                }
                else {
                    token = jwt.sign({user_id: userId}, process.env.JWT_SECRET);
                    return res.json({token})
                }
            });

        }
        else {
            res.sendStatus(401);
        }
    })
    .catch((err) => {
        next(err);
    });   
}



exports.validate_createUser = [
    celebrate({
        body: Joi.object().keys({
            username: Joi.string().required().max(25),
            email: Joi.string().email().required(),
            short_description: Joi.string().max(40),
            password: Joi.string().required().max(60)
        })
    }),
    (req, res, next) => {
        conn('user').where('email', req.body.email)
        .then(rep => {
            if(rep.length > 0) {
                res.sendStatus(409);
            }
            else {
                next();
            }
        })
        .catch(err =>  {
            next(err);
        })
    }
]

exports.createUser = async function(req, res, next){
    bCrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            next(err);
        }
        else {
            conn('user').insert({
                username: req.body.username,
                email: req.body.email,
                short_description: req.body.short_description,
                pass_hash: hash 
            })
            .then((obj) => { 
                res.status(201).json({
                    resource_id: obj[0]
                });
            })
            .catch((err) => {
                next(err);
            })
        }
    })
    
    
}