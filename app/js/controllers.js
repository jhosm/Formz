'use strict';

function XsdCtrl($scope, $http, xsd, $routeParams) {
	$http.get('xsd/' + $routeParams.xsd).success(function(data) {
		$scope.xmlSchema = xsd.parse(data);
	});
}
XsdCtrl.$inject = ['$scope', '$http', 'xsd', '$routeParams'];

function MyCtrl2() {}
MyCtrl2.$inject = [];