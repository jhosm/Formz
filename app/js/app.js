
'use strict';


// Declare app level module which depends on filters, and services
angular.module('formz', ['bootstrap', 'formz.controllers', 'formz.filters', 'formz.services', 'formz.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/form/:id', {templateUrl: 'partials/form.html', controller: 'XsdCtrl'});
    $routeProvider.otherwise({redirectTo: '/form/human'});
  }]);

angular.module('formz.controllers', ['ngResource']);
angular.module('formz.filters', []);
angular.module('formz.services', ['ngResource']);
angular.module('formz.directives', []);