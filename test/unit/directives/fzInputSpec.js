'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

  describe('fzInput', function() {
    var element;

    beforeEach(module('formz.directives', 'partials/directives/fzInput.html'));

    beforeEach(inject(function($compile, $rootScope) {

      var scope = $rootScope;

      scope.label = 'My Label';
      scope.placeholder = 'My Placeholder';
      scope.value = 'My Value';      
      scope.documentation = 'My Docs';
      scope.locales = {string: function(text) {
        if(text === 'My Docs') return 'My Documentation';
      }};

      element = angular.element('<fzinput></fzinput>');
      $compile(element)(scope);
      scope.$digest();
    }));


    it('should print a label', function() {
      expect(element.find('label').text()).toBe('My Label:');
      var input = element.find('div.controls input[type=text]');
      expect(input.attr('placeholder')).toBe('My Placeholder');
      expect(input.val()).toBe('My Value');

      expect(element.find('span.help-block').text()).toBe('My Documentation');
    });
  });
});