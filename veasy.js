angular.module('veasy', []);
angular.module('veasy.momentFormat', []);
angular.module('veasy.calendar', [ 'veasy.momentFormat' ]);
angular.module('veasy.table', [ 'ngSanitize', 'veasy.table.templates' ]);
