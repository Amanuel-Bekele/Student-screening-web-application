var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Creating new user */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user with specified Id. */
router.get('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* update user with id */
router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* Toggle user status */
router.patch('/status/:id', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user status  */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET inactive users. */
router.get('/inactive', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
