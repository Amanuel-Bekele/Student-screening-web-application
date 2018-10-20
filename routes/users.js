var express = require('express');
var router = express.Router();
// const User = require(__dirname+'/models/'+'user.js');


/* GET users listing. */
router.get('/', function(req, res) {
  req.mongoose.model('User').find({},function(err,users){
    res.send(users);
  })
});

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
      if (err) return res.status(500).send(err);
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
