var express = require('express'); 
var router = express.Router();  
const saltRounds = 10;
const passwordUtils = require('../utils/passwordutils');

/* GET all students solutions listing. */
router.get('/solutions',function(req, res) { 
    req.mongoose.model('Solution').find({},function(err,solutions){
      if(err) return res.status(500).send(err)
      res.send({solutions}); 
  });
});


/* GET student solution specified Id. */
router.get('/solutions/:id', function(req, res) { 
  req.mongoose.model('Solution').findOne({_id:req.params.id},function(err,solution){
    if(err) return res.status(500).send(err)
    res.send(solution);
  })
});

/* GET student solutiona student Id. */
router.get('/:id/solutions', function(req, res) { 
  req.mongoose.model('Solution').find({studentId:req.params.id},function(err,solution){
    if(err) return res.status(500).send(err)
    res.send(solution);
  })
});
 
/* add submitted student solution */
router.post('/:id/solution', function(req, res) {
    const Solution = req.mongoose.model('Solution');
    const newSolution = new Solution(req.body);  
    newSolution.studentId = req.params.id;
    
    newSolution.save((err)=>{ 
      if (err) return  res.status(403).send(err);   
        return res.status(200).send(newSolution);
    });
});

 

/* Toggle user status */
router.patch('/solution/:id/:status', function(req, res) {
  req.mongoose.model('Solution').findByIdAndUpdate({"_id":req.params.id},{$set:{"status":req.params.status}},
  (err, user) => { 
        if (err) return res.status(500).send(err); 
         
        return res.send({"responseCode":"00","responseMessage":"Update successful"})
    }
  );
});
 
 
 

module.exports = router;
