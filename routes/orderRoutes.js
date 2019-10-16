module.exports = function(app){
    const order = require('../src/orderController');
    const middleware = require('../middleware/jwtMiddleware');

    app.post('/order/create', order.order_create);
    app.post('/order/cancel', order.order_cancel);
    app.post('/order/total_price', order.order_total_price);
    app.post('/order/products', order.order_products);
    app.post('/order/state', order.order_state);
    app.route('/order/history')
        .all(middleware.verify_token)
        .post(order.order_history);
    app.route('/order/pay')
        .all(middleware.verify_token)
        .post(order.order_pay);
};



