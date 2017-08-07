(() => {
  'use strict';

  angular
    .module('angular-ac')
    .factory('callService', ($http, apiUrl) => {
      return {
        getCallsByDay: () => {
          return $http.get(`${apiUrl}/activities`)
            .then((resp) => {
              //we build our object to return
              const callsByDay = {
                days: []
              };
              //we filter archived calls
              const allCalls = resp.data.filter((call) => {
                return !call.is_archived;
              });
              //we add length of all calls
              callsByDay.totalCalls = allCalls.length;
              allCalls.forEach((call) => {
                //we use date object
                call.created_at = new Date(call.created_at);
                // we define date for day of call
                const dayOfCall = call.created_at.toDateString();
                //do we already have this day in our object to return ?
                const existingDayIndex = callsByDay.days.findIndex((day) => {
                  return day.date.toDateString() == dayOfCall;
                });
                if(existingDayIndex !== -1){
                  //we add to this day
                  callsByDay.days[existingDayIndex].calls.push(call);
                }
                else{
                  //we create day
                  callsByDay.days.push({
                    date: new Date(dayOfCall),
                    calls: [call]
                  });
                }
              });
              return callsByDay;
            });
        },

        getCallDetails: (id) => {
          return $http.get(`${apiUrl}/activities/${id}`)
            .then((resp) => {
              //we use date object
              resp.data.created_at = new Date(resp.data.created_at);
              return resp.data;
            });
        },

        archiveCall: (id) => {
          return $http.post(`${apiUrl}/activities/${id}`, {
                is_archived: true
              }
            ).then((resp) => {
              return resp.data;
            });
        }
      };
    });

})();
