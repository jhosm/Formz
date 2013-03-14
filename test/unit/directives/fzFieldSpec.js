'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

  describe('The fzField directive', function() {
    var element, $httpBackend;

    beforeEach(module('formz.directives', 'formz.services', 'partials/directives/fzField.html'));

    beforeEach(inject(function($compile, $rootScope, _$httpBackend_) {

      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('locales/en-us.js').
        respond({help: 'No help.'});

      var scope = $rootScope;

      scope.data = {
        label: 'My Label',
        placeholder: 'My Placeholder',
        documentation: 'My Docs',
        value: 'My Value'
      };

      element = angular.element('<div fz-field data="data"/>');
      $compile(element)(scope);

      scope.$digest();
    }));


    it('should print all the relevant information', function() {
      expect(element.find('label').text()).toBe('* My Label:');
      var input = element.find('div.controls input[type=text]');
      expect(input.attr('placeholder')).toBe('My Placeholder');
      expect(input.val()).toBe('My Value');

      $httpBackend.flush();
      // this replace is just a trim()
      expect(element.find('span.help-block').text().replace(/(^\s+|\s+$)/g, '')).toBe('My Docs');
    });
  });
});