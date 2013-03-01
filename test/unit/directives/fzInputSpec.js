'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

  describe('fzInput', function() {
    var element, $httpBackend;

    beforeEach(module('formz.directives', 'formz.services', 'partials/directives/fzInput.html'));

    beforeEach(inject(function($compile, $rootScope, _$httpBackend_) {

      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('locales/en-us.js').
        respond({help: 'No help.'});

      var scope = $rootScope;

      scope.value='My Value';

      element = angular.element('<div fz-input label="My Label" placeholder="My Placeholder" fz-value="value" documentation="My Docs"/>');
      $compile(element)(scope);

      scope.$digest();
    }));


    it('should print a label', function() {
      expect(element.find('label').text()).toBe('My Label:');
      var input = element.find('div.controls input[type=text]');
      expect(input.attr('placeholder')).toBe('My Placeholder');
      expect(input.val()).toBe('My Value');

      $httpBackend.flush();
      expect(element.find('span.help-block').text()).toBe('My Docs');
    });
  });
});