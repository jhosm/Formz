'use strict';

var app = angular.module('formz.controllers');

app.controller('XsdCtrl', function XsdCtrl($scope, $http, fzXsd, $routeParams, fzLocalization) {
	$scope.showXml = false;
	$scope.locales = fzLocalization;
	$http.get('xsd/' + $routeParams.id + '.xsd').success(function(data) {
		if(angular.isUndefined($scope.forms)) $scope.forms = [];
		
		var forms = $scope.forms;
		var currentForm = _.find(forms, function(form){ return form.id === $routeParams.id; });

		if(angular.isUndefined(currentForm)) {
			currentForm = {};
			forms.push(currentForm);
		}
		
		currentForm.schema = fzXsd.parse(data);
	});
}).$inject = ['$scope', '$http', 'fzXsd', '$routeParams', 'fzLocalization'];


app.controller('MainCtrl', function MainCtrl($scope, $resource) {
	var FormsDefinitions = $resource('xsd/formsDefinitions.js');
	$scope.forms = FormsDefinitions.query(function() {
		$scope.tabs = _.pluck($scope.forms, 'label');
	});
}).$inject = ['$scope', '$resource'];

app.controller("TabsCtrl", function($scope, $routeParams, $location) {

	//Each time controller is recreated, check tab in url
	$scope.currentTab = $routeParams.id; 
	$scope.$watch('currentTab', function(id, oldId) {
		if(id !== oldId) {
			$location.path('/form/' + id);
		}
	});
});