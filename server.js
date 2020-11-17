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

//React app resources
app.use(express.static(path.join(__dirname, 'client/build')));

//API Routing
const authRouter = require('./auth/router');
app.use('/api/auth', authRouter);

const thingRouter = require('./thing/router');
app.use('/api/thing', JwtAuth, thingRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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