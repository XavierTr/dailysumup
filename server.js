const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const app = express();
const port = process.env.API_PORT;
const JwtAuth = require('./auth/middleware/jwtAuth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routing
const authRouter = require('./auth/router');
app.use('/api/auth', authRouter);

const thingRouter = require('./thing/router');
app.use('/api/thing', JwtAuth, thingRouter);

//Error handling
app.use(errors())
app.use((err, req, res, next) => {
    if(process.env.NODE_ENV === 'development') {
        res.status(500).json({"message": err.message, "stack": err.stack});
    }
    else {
        console.log(err);
        res.sendStatus(500);
    }
    
})

//Start
app.listen(port, () => console.log(`[${process.env.NODE_ENV}] Listening on port ${port}`));