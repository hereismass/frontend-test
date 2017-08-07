(() => {
  'use strict';

  angular
    .module('angular-ac')
    .filter('duration', () => {
      // we return a prettier stribg for the duration
      return (input) => {
        const secs = parseInt(input, 10),
          h = Math.floor(secs / 3600),
          m = Math.floor((secs % 3600) / 60),
          s = secs % 60;

        return `${h > 0 ? (h > 10 ? h : "0" + h) + ":" :""}${m > 10 ? m : "0" + m}:${s > 10 ? s : "0" + s}`;
      };

    });
})();