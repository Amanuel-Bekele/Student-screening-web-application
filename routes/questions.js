var express = require('express');
var router = express.Router(); 

/* GET questions listing. */
router.get('/',function(req, res) { 
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

/* GET active questions. */
router.get('/active', function(req, res) { 
  req.mongoose.model('Question').find({"status":"active"},function(err,users){
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
    const newQuestion = new User(req.body);
    newQuestion.status="active";
    newQuestion.createdBy= req.authUser.user.userName ;
    newQuestion.createdOn = ""+new Date()  
    newQuestion.save((err)=>{ 
      if (err) {
        const response =err.code==11000? {"responseCode":"10","responseMessage":"Duplicate username and/or email"}:err;
        return  res.status(403).send(response);
      }
      return res.status(200).send(newQuestion);
    });
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
