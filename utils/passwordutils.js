
const bcrypt = require('bcrypt');
const saltRounds = 10;

 function hashPassword(password){ 
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)    
} 
 