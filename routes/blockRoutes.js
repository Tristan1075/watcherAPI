/*module.exports = function (app) {
    const block = require('../src/blockController');
    const middleware = require('../middleware/jwtMiddleware');
    const api = require('../providers/WooCommerceApiProvider');

    app.route('/blocks')
        .all(middleware.verify_token)
        .get(block.list_all_blocks)
        .post(block.create_a_block);

    app.route('/blocks/:blockId')
        .get(block.read_a_block)
        .put(block.update_a_block)
        .delete(block.delete_a_block);

    app.route('/blocks/hash/:blockHash')
        .get(block.readBlockByHash)
        .put(block.updateBlockByHash)
        .delete(block.deleteBlockByHash);

    app.route('/blockcount')
        .get(api.getBlockCount);

    app.route('/blocks/interval')
        .get(api.getInterval);

    app.route('/blocks/info')
        .get(api.getBitcoinInfo);

};*/



