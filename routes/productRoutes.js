module.exports = function(app){
    const products = require('../src/productController');

    app.route('/products')
        .get(products.getAllProducts);

    app.route('/products/:productId')
        .get(products.getProduct);

    app.route('/products/create')
        .post(products.createProduct);

    app.route('/products/addSize')
        .post(products.addSizeToProduct);

    app.route('/products/addTag')
        .post(products.addTagsToProduct);

    app.route('/products/viewed')
        .post(products.productViewed);

    app.route('/products/disable')
        .post(products.disableProduct);

    app.route('/products/activate')
        .post(products.activateProduct);

    app.route('/products/updateImage')
        .post(products.updateImage);
};



