(() => {
  'use strict';

  angular
    .module('angular-ac')
    .controller('ActivitiesController', ($scope, $state, callService) => {

      $scope.openCallDetails = (call) => {
        //we go to the detail page
        $state.go("activity_detail", {
          id:call.id
        });
      };

      $scope.archiveAllCalls = (call) => {
        const promises = [];
        //we archive every call 1 by 1
        $scope.callsByDay.days.forEach((day) => {
          day.calls.forEach((call) => {
            //we add the promise returned to the promise array
            promises.push(callService.archiveCall(call.id));
          });
        });
        // we remove the data (will show loading)
        $scope.callsByDay = null;
        //we reload calls after all promises
        Promise.all(promises).then(() => { 
          _loadCalls();
        });  
      };

      const _loadCalls = () => {
        callService.getCallsByDay().then((calls) => {
          //we add data from service to the scope
          $scope.callsByDay = calls;
        });
      };

      //we load calls on init
      _loadCalls();
    });

})();
