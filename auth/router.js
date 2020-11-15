const express = require('express');
const router = express.Router();

const Controller = require('./controller');

router.get('/', Controller.authentication_test)
router.post('/', Controller.validate_authenticate, Controller.authenticate);

if(process.env.NODE_ENV === 'development') {
    router.post('/createUser', ...Controller.validate_createUser, Controller.createUser);
}

module.exports = router;
