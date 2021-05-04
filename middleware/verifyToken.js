const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers["x-access-token"] || req.body.token || req.query.token;
    if (token) {
        jwt.verify(token,req.app.get('api_key'),(err,decoded)=> {
            if(err) {
                res.json({status:false,message:'Token yetkilendirelemedi.'})
            } else {
                req.decode = decoded;
                next();
            }
        });
    } else {
        res.json({status:false,message:"Token yok veya geçerli değil"})
    }
}
