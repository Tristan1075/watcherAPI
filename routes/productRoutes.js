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
};



