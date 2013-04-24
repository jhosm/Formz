(function() {
	'use strict';

	var app = angular.module('formz.controllers');

	//Teste
	app.controller('XsdCtrl', ['$scope', '$http', 'fzXsd', '$routeParams', 'fzLocalization', function XsdCtrl($scope, $http, fzXsd, $routeParams, fzLocalization) {

		$scope.save = function(form) {
			$scope.showXml = true;
		};

		$scope.showXml = false;
		$scope.locales = fzLocalization;
		$http.get('xsd/' + $routeParams.id + '.xsd').success(function(data) {
			$scope.form = fzXsd.parse(data);
		});
	}]);


	app.controller('MainCtrl', ['$scope', '$resource', 'fzLocalization', function MainCtrl($scope, $resource, fzLocalization) {
		$scope.locales = fzLocalization;

		var FormsDefinitions = $resource('xsd/formsDefinitions.js');
		$scope.forms = FormsDefinitions.query(function() {
			$scope.tabs = _.pluck($scope.forms, 'label');
		});
	}]);

	app.controller("TabsCtrl", ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {

		//Each time controller is recreated, check tab in url
		$scope.currentTab = $routeParams.id;
		$scope.$watch('currentTab', function(id, oldId) {
			if (id !== oldId) {
				$location.path('/form/' + id);
			}
		});
	}]);
}());