Package.describe({
    name: 'meteor-mercadopago',
    summary: "Set of MercadoPago helper methods for Meteor.",
    version: "0.0.1"
//    git: "https://github.com/meteorhacks/meteor-async.git"
});

Package.on_use(function(api) {
    /* Use or imply other packages.

   * Example:
   *  api.use('ui', 'client');
   *  api.use('iron-router', ['client', 'server']);
   */
    api.use('meteorhacks:async', ['server']);

    /*
     * Add files that should be used with this
     * package.
     */
    api.add_files('meteor-mercadopago.js', ['server']);

    /*
     * Export global symbols.
     *
     * Example:
     *  api.export('GlobalSymbol');
     */
    api.export('MercadoPago');
});

Package.on_test(function(api) {
    api.use('meteor-mercadopago');
    api.use('tinytest');

    api.add_files('meteor-mercadopago_tests.js');
});

Npm.depends({
    "mercadopago": "https://github.com/mercadopago/sdk-nodejs/tarball/85a91136b00b802ec032a3296f88605422b69151"// "0.2.1"
});