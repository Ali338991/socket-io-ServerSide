var express = require("express")
var router = express.Router();

let {login} = require('./SocketController')


router.get('/', (req,res)=>{  
    login(req,res)
})





module.exports = router;