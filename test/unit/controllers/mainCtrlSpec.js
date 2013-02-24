'use strict';

describe('XsdCtrl', function() {
  var scope, ctrl, $httpBackend;

  beforeEach(function() {
    module('formz.controllers');
    
    inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('xsd/formsDefinitions.js').
      respond([{
        id: 'person',
        label: 'Pessoas',
        definitionUrl: 'human.xsd'
      },{
        id: 'house',
        label: 'Casas',
        definitionUrl: 'house.xsd'
      }]);

      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {
        $scope: scope
      });
    })
  });

  it("should get all the forms' definitions", function() {
    $httpBackend.flush();
    var personForm = scope.forms[0];
    expect(personForm.id).toEqual('person');
    expect(personForm.label).toEqual('Pessoas');
    expect(personForm.definitionUrl).toEqual('human.xsd');

    var houseForm = scope.forms[1];
    expect(houseForm.id).toEqual('house');
    expect(houseForm.label).toEqual('Casas');
    expect(houseForm.definitionUrl).toEqual('house.xsd');
  });

  xit('should return an empty array when there are no definitions', function() {

  });
});