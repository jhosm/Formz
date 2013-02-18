'use strict';

function XsdCtrl($scope, $http, fzXsd, $routeParams, fzLocalization) {
	$scope.showXml = false;
	$scope.locales = fzLocalization;
	$http.get('xsd/' + $routeParams.xsd).success(function(data) {
		$scope.xmlSchema = fzXsd.parse(data);
	});
}
XsdCtrl.$inject = ['$scope', '$http', 'fzXsd', '$routeParams', 'fzLocalization'];

function MyCtrl2() {}
MyCtrl2.$inject = [];