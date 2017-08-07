(() => {
  'use strict';

  angular
    .module('angular-ac')
    .controller('ActivityDetailController', ($scope, $state, $stateParams, callService) => {

      $scope.archiveCall = () => {
        // we remove data from scope
        $scope.call = null;
        callService.archiveCall($stateParams.id)
          .then((call) => {
            //after archive, we go to the main list page
            $state.go("activities");
          })
          .catch((resp) => {
            //we show an error if archiveCall didnt succeded
            alert(resp.data.error);
          });
      };

      const _loadCall = () => {
        callService.getCallDetails($stateParams.id)
          .then((call) => {
            //we add call data to the scope
            $scope.call = call;
          })
          .catch((resp) => {
            //if getting call details didnt work (wrong id?), we show an error
            alert(resp.data.error);
          });
      };
      
      //we load call data on init
      _loadCall();
    });

})();
