module.exports = function(app){
    const sizes = require('../src/sizeController');

    app.route('/sizes')
        .get(sizes.getAllSize);

    app.route('/sizes/:sizeId')
        .get(sizes.getSize);

    app.route('/sizes/create')
        .post(sizes.createSize);
};
