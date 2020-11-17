const express = require('express');
const router = express.Router();

const Controller = require('./controller');

router.get('/', Controller.getDailyThings);
router.post('/', Controller.validate_addDailyThing, Controller.addDailyThing);

router.get('/:id', Controller.authorize_getDailyThing, Controller.getDailyThing)

module.exports = router;