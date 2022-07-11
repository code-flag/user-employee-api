
const VerifyToken = (req, res, next) => {
     // get herder value
     const bearerHeader = req.headers['authorization'];
     // check if it is undefined
     if(typeof bearerHeader !== 'undefined') {
         const bearer = bearerHeader.split(' ');
         const bearerToken = bearer[1];
         req.token = bearerToken;
         next();
     }
     else { 
         res.sendStatus(403);
     }
}

module.exports = VerifyToken;