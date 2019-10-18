module.exports = function(app) {
    const imageController = require('../src/productImagesController');

    app.get('/images',imageController.getAllImages);
    app.post('/images/strap', imageController.postImageStrap);
    app.post('/images/face', imageController.postImageFace);
    app.post('/images/case', imageController.postImageCase);
    app.post('/images/custom', imageController.postCustomWatch);
    app.post('/images/download', imageController.postImageToFusion);
    app.get('/images/fusion', imageController.fusionImages);

};
