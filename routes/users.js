var express = require('express');
var router = express.Router();
// const User = require(__dirname+'/models/'+'user.js');


/* GET users listing. */
router.get('/', verifyToken,function(req, res) {
  req.jwt.verify(req.token,'SecretKey',(error,authData)=>{
    console.log("USerrrrr  ",authData);
  })
  req.mongoose.model('User').find({},function(err,users){
    res.send(users);
  })
});

function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization']; 
  
  if( bearerHeader != undefined){
    const token = bearerHeader.split(' ')[1];
    console.log('token  ',token)
    req.token = token;
    next();
  }else{
    res.status(403).send({"responseMessage":"Unathorized to access this api"})
  }
  
}

/* GET inactive users. */
router.get('/inactive', function(req, res) { 
  req.mongoose.model('User').find({"status":"inactive"},function(err,users){
    res.send(users);
  })
});

/* GET user with specified Id. */
router.get('/:id', function(req, res) { 
  req.mongoose.model('User').findOne({_id:req.params.id},function(err,users){
    res.send(users);
  })
});

/* GET user with specified username. */
router.get('/userName/:userName', function(req, res) {
  req.mongoose.model('User').findOne({userName:req.params.userName},function(err,users){
    res.send(users);
  })
});

/* Creating new user */
router.post('/', function(req, res) {
    const User = req.mongoose.model('User');
    const newUser = new User(req.body);
    newUser.save((err)=>{ 
      if (err) {
        const response =err.code==11000? {"responseCode":"10","responseMessage":"Duplicate username and/or email"}:err;
        return  res.status(403).send(response);
      }
      return res.status(200).send(newUser);
    });
});



/* update user with username */
router.put('/:username', function(req, res) {
  req.mongoose.model('User').update({"userName":req.params.username},
    req.body, 
    (err, user) => { 
          if (err) return res.status(500).send(err); 
          if(user.nModified>=1){
            return res.send({"responseCode":"00","responseMessage":"Update successful"})
          }
          return res.send(user);
      }
    ); 
});

/* Toggle user status */
router.patch('/status/:id/:status', function(req, res) {
  req.mongoose.model('User').findByIdAndUpdate({"_id":req.params.id},{$set:{"status":req.params.status}},
  (err, user) => { 
        if (err) return res.status(500).send(err); 
         
        return res.send({"responseCode":"00","responseMessage":"Update successful"})
    }
  );
});
 
module.exports = router;
