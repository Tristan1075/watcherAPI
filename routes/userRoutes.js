module.exports = function(app){
    const user = require('../src/userController');

    app.post('/users/register', user.user_register);
    app.post('/users/login', user.user_login);
    
};



