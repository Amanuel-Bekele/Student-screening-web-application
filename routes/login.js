var express = require('express');
var router = express.Router();

//login Route
router.post('/',(req,res) => {
  req.mongoose.model('User').findOne(req.body,function(err,user){
    if(err) res.status(500).send(err);
    req.jwt.sign({user},'SecretKey',(error,token)=>{
      if(error) res.status(500).send(error);
      res.send({token})
    })
    
  }) 
  
});


  
module.exports = router;
