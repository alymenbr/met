Package.describe({
  name: 'mixpanel',
<<<<<<< HEAD
  summary: 'local mixpanel package'
=======
  summary: 'Teste do mixpanel'
>>>>>>> 7a231712ac68180e4212a2426c600dbe10f81836
});

Package.on_use(function (api) {
  /* Use or imply other packages.

   * Example:
   *  api.use('ui', 'client');
   *  api.use('iron-router', ['client', 'server']);
   */

   /*
    * Add files that should be used with this
    * package.
    */
   api.add_files('mixpanel.js', ['client']);

  /*
   * Export global symbols.
   *
   * Example:
   *  api.export('GlobalSymbol');
   */
});

Package.on_test(function (api) {
  api.use('mixpanel');
  api.use('tinytest');
  
  api.add_files('mixpanel_tests.js');
});
