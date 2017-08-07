(() => {
  'use strict';

  angular
    .module('angular-ac', [
      'ui.router'
    ]).constant(
      'apiUrl', 'https://aircall-job.herokuapp.com'
    );

})();
