(() => {
  'use strict';

  angular
    .module('angular-ac')
    .config(($urlRouterProvider, $stateProvider) => {
      $stateProvider
        .state('activities', {
          url: '/',
          templateUrl: 'views/activities.html'
        })
        .state('activity_detail', {
          url: '/:id',
          templateUrl: 'views/activity_detail.html'
        });

      $urlRouterProvider.otherwise('/');
    });
    
})();
