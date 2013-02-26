'use strict';

describe('MainCtrl', function() {
  var scope, ctrl, $httpBackend;

  function setupController(formsDefinitionsResponse) {
    inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('xsd/formsDefinitions.js').
      respond(formsDefinitionsResponse);

      scope = $rootScope.$new();
      ctrl = $controller('MainCtrl', {
        $scope: scope
      });
    })
  }

  beforeEach(function() {
    module('formz.controllers', 'formz.services');
  });

  it("should get all the forms' definitions", function() {
    setupController([{
        id: 'person',
        label: 'Pessoas'
      },{
        id: 'house',
        label: 'Casas'
      }]);

    $httpBackend.flush();
    var personForm = scope.forms[0];
    expect(personForm.id).toEqual('person');
    expect(personForm.label).toEqual('Pessoas');
    
    var houseForm = scope.forms[1];
    expect(houseForm.id).toEqual('house');
    expect(houseForm.label).toEqual('Casas');

    expect(scope.tabs).toEqual(['Pessoas', 'Casas']);
  });

  it('should return an empty array when there are no definitions', function() {
    setupController([]);

    $httpBackend.flush();
    expect(scope.forms).toEqual([]);
    expect(scope.tabs).toEqual([]);
  });
});