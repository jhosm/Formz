
'use strict';


// Declare app level module which depends on filters, and services
angular.module('definitionsCenter', ['definitionsCenter.filters', 'definitionsCenter.services', 'definitionsCenter.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/xsdForm/:xsd', {templateUrl: 'partials/xsdForm.html', controller: XsdCtrl});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/xsdForm/definitions.xsd'});
  }]);
