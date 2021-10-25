var jwt = require('jsonwebtoken');

const verifyToken = async (req,res,next) =>{
    if (!req.body.token) {
        res.status(403).send("token not found")
    }

      const { token } = req.body;
    var decoded = await jwt.verify(token, process.env.jwtKey);

    if (!decoded) {
        res.status(400).json({ status: "error", message: "token not found", statusCode: 400 })
        return
    }
    req.user = decoded;  
    next()
}

module.exports = verifyToken