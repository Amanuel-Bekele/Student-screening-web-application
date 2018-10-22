var express = require('express'); 
var router = express.Router();  
var uuid = require('uuid');
var random = require('mongoose-random');
 
/* GET examTokens listing. */
router.get('/',function(req, res) { 
    req.mongoose.model('ExamToken').find({},function(err,examTokens){ 
      if(err) return res.status(500).send({"responseMessage":"Something went wrong"})
      res.send(examTokens); 
  });
});

/* GET inactive examTokens. */
router.get('/inactive', function(req, res) { 
  req.mongoose.model('ExamToken').find({"status":"inactive"},function(err,examTokens){
    if(err) return res.status(500).send({"responseMessage":"Something went wrong"})
    res.send(examTokens);
  })
});

/* GET inactive examTokens. */
router.get('/active', function(req, res) { 
  req.mongoose.model('ExamToken').find({"status":"active"},function(err,examTokens){
    res.send(examTokens);
  })
});

/* GET examTokens with specified Id. */
router.get('/:id', function(req, res) { 
  req.mongoose.model('ExamToken').findOne({_id:req.params.id},function(err,examToken){
    if(err) return res.status(500).send({"responseMessage":"Something went wrong"})
    res.send(examToken);
  })
});

/* GET exam questions */
router.get('/questions/:token/:studentId', function(req, res) { 
    var filter = { status: "active" };
    var fields = { question: 1,status:1 };
    var options = { limit: 3};
    req.mongoose.model('Question').findRandom(filter, fields, options, function(err, questions) {
      if(err) return res.status(500).send({"responseMessage":"Something went wrong"})
      res.status(200).send(questions)
    });
});

/* GET examTokens status by Id. */
router.get('/verify/status/:token', function(req, res) { 
  req.mongoose.model('ExamToken').findOne({token:req.params.token},function(err,examToken){
    if(err) return res.status(500).send({"responseMessage":"Something went wrong"})
    res.send({"isActive":examToken.status=="active","firstName":examToken.student.firstName,"studentId":examToken.student._id});
  })
});

/* Creating new user */
router.post('/', function(req, res) {

    const ExamToken = req.mongoose.model('ExamToken');
    const examTokenObj = new ExamToken();
    examTokenObj.status="active";
    examTokenObj.token =uuid.v1();
    examTokenObj.createdBy = req.authUser.user.userName ;
    examTokenObj.createdOn = ""+new Date()

    req.mongoose.model('Student').findOne({_id:req.body.studentId},function(err,student){
        if(err || student==null){
          if(err) return res.status(500).send({"responseMessage":"Something went wrong"})
        }
        examTokenObj.student = student
        examTokenObj.save((err)=>{ 
          if (err) {
            const response =err.code==11000? {"responseCode":"10","responseMessage":"Duplicate username and/or email"}:err;
            return  res.status(403).send(response);
          } 
          return res.status(200).send(examTokenObj);
        });
    })
    

});


/* Toggle examTokens status */
router.patch('/status/:id/:status', function(req, res) {
  req.mongoose.model('ExamToken').findByIdAndUpdate({"_id":req.params.id},{$set:{"status":req.params.status}},
  (err, examTokens) => {  
        if(err) return res.status(500).send({"responseMessage":"Something went wrong"})
        return res.send({"responseCode":"00","responseMessage":"Update successful"})
    }
  );
});
 
 

module.exports = router;
