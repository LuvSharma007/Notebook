const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    const token = req.cookies.Token;
    
    if(!token){
        return res.status(400).send('login ker phale !');
    }

    try {
        const verified = jwt.verify(token,'$uperman007');
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).send('invalid token');
    }

}

module.exports = auth;