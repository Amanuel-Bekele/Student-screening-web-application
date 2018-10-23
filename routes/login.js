var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', (req, res) => {

    const search = {
        "userName": req.body.username
    };
    req.mongoose.model('User').findOne(search, function (err, user) {
        console.log("error "+err+"  user  "+user);
        if (err) {
            res.status(500).send(err);
        } else if (user == null) {
            res.status(403).send({"responseMessage": "Invalid username or password"})
        } else {
            const doesMatch = passwordMatch(req.body.password, user.password);
            if (doesMatch) {
                req.jwt.sign({user}, 'SecretKey', (error, token) => {
                    if (error) res.status(500).send(error);
                    res.send({"token":token,"role":user.role})
                });
            } else {
                res.status(403).send({"responseMessage": "Invalid username or password"})
            }
        }
    })
});

function passwordMatch(userPassword, hashedPasswordFromDB) {
    return bcrypt.compareSync(userPassword, hashedPasswordFromDB);
}


module.exports = router;
