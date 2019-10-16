module.exports = function(app){
    const tags = require('../src/tagController');

    app.route('/tags')
        .get(tags.getAllTags);

    app.route('/tags/:tagId')
        .get(tags.getTag);

    app.route('/tags/create')
        .post(tags.createTag);
}