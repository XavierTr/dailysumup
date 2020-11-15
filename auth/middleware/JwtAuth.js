const jwt = require('jsonwebtoken');


function extractToken(req) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        return bearerHeader.split(' ')[1];
    }
    return null;
}


function JwtAuth(req, res, next) {
    const token = extractToken(req);
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }
            else {
                req.user_id = authData.user_id;
                next();
            }
        });
    }
    else {
        res.sendStatus(401);
    }
}

module.exports = JwtAuth;