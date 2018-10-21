var express = require('express');
var router = express.Router(); 

/* GET questions listing. */
router.get('/',function(req, res) {
  console.log("questions")
  req.jwt.verify(req.token,'SecretKey',(error,authData)=>{ 
  })
  req.mongoose.model('Question').find({},function(err,users){
    res.send(users);
  })
});

/* GET inactive questions. */
router.get('/inactive', function(req, res) { 
  req.mongoose.model('Question').find({"status":"inactive"},function(err,users){
    res.send(users);
  })
});

/* GET questions with specified Id. */
router.get('/:id', function(req, res) { 
  req.mongoose.model('Question').findOne({_id:req.params.id},function(err,users){
    res.send(users);
  })
});


/* Creating new questions */
router.post('/', function(req, res) {
    const User = req.mongoose.model('Question');
    const newUser = new User(req.body);
    newUser.save((err)=>{ 
      if (err) {
        const response =err.code==11000? {"responseCode":"10","responseMessage":"Duplicate username and/or email"}:err;
        return  res.status(403).send(response);
      }
      return res.status(200).send(newUser);
    });
});



/* update questions with id */
router.put('/:id', function(req, res) {
  req.mongoose.model('Question').update({"userName":req.params.username},
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

/* Toggle question status */
router.patch('/status/:id/:status', function(req, res) {
  req.mongoose.model('Question').findByIdAndUpdate({"_id":req.params.id},{$set:{"status":req.params.status}},
  (err, user) => { 
        if (err) return res.status(500).send(err); 
         
        return res.send({"responseCode":"00","responseMessage":"Update successful"})
    }
  );
});
 
module.exports = router;
