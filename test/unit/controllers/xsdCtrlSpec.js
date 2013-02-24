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
    expect(scope.forms).toBeUndefined();
    $httpBackend.flush();
    expect(scope.forms[0].schema.rootElement.name).toEqual('person');
  });

  it("should reuse forms property, if there's already one in the scope", function() {
    scope.forms = [{'id':'anID'}];
    $httpBackend.flush();
    expect(scope.forms[1].schema.rootElement.name).toEqual('person');

    expect(scope.forms[0].id).toEqual('anID');
  });
});