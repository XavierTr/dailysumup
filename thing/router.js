const express = require('express');
const router = express.Router();

const Controller = require('./controller');

router.get('/', Controller.getDailyThings);
router.post('/', Controller.validate_addDailyThing, Controller.addDailyThing);

module.exports = router;