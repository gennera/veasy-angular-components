angular.module('veasy.table').filter('vtUrl', ['$sanitize', function ($sanitize) {
  return function (input, text, target) {
    return $sanitize('<a target="' + target + '" href="' + input + '">' + input + '</a>');
  };
}]);
