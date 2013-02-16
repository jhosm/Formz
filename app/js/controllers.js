'use strict';

function XsdCtrl($scope, $http, fzXsd, $routeParams) {
	$http.get('xsd/' + $routeParams.xsd).success(function(data) {
		$scope.xmlSchema = fzXsd.parse(data);
	});
}
XsdCtrl.$inject = ['$scope', '$http', 'fzXsd', '$routeParams'];

function MyCtrl2() {}
MyCtrl2.$inject = [];