'use strict';

describe('XsdCtrl', function() {
  var scope, ctrl, $httpBackend;

  beforeEach(function() {
    module('formz.controllers', 'formz.services');
    
    inject(function(_$httpBackend_, $rootScope, $controller, $routeParams) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('xsd/human.xsd').
      respond('<?xml version="1.0"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="person" type="xs:string"/></xs:schema>');

      $routeParams.id = 'human'
      scope = $rootScope.$new();
      ctrl = $controller('XsdCtrl', {
        $scope: scope
      });
    })
  });

  it('should get and parse a schema', function() {
    expect(scope.form).toBeUndefined();
    $httpBackend.flush();
    expect(scope.form.rootElement.name).toEqual('person');
  });
});