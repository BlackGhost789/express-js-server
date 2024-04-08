const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) =>{
    const token = req.headers.token;
    if(token){
        jwt.verify(token, process.env.PWD_KEY, (err, user)=> {
            if(err) res.json('you are not authorizerd');
            req.user = user;
            next();
        })
    }else{
        res.status(400).json('you are not authonticated')
    }
}

const verifyTokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id){
            next()
        }else{
            res.json('you are not you')
        }
    });
    
}

const verifyTokenAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user)
        if(req.user.isAdmin === true){
            next()
        }else{
            res.json('admin user requires to this operation')
        }
    });
    
}






module.exports = { verifyToken , verifyTokenAuthorization, verifyTokenAdmin}