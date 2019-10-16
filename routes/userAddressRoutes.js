module.exports = function(app){
    const userAddressController = require('../src/userAddressController');

    app.route('/userAddress/:id_user')
        .get(userAddressController.get_address_by_user);

    app.route('/userAddress')
        .post(userAddressController.add_address);

    app.route('/userAddress/:id')
        .put(userAddressController.update_address);

    app.route('/userAddress/:id')
        .delete(userAddressController.delete_address);
};
