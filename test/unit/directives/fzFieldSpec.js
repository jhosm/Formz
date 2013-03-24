'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

  describe('The fzField directive', function() {
    var element, scope, $httpBackend, compile;

    beforeEach(module('formz.directives', 'formz.services', 'partials/directives/fzField.html'));

    beforeEach(
      module(function($provide) {
        var mock = {
          string: function() {return 'My Docs';}
        };
        $provide.value('fzLocalization', mock);
      })
    );

    function compileFzField(data) {
      var element;
  
      inject(function($compile, $rootScope) {
        var scope = $rootScope;

        scope.data = data;

        element = angular.element('<div fz-field data="data"/>');
        $compile(element)(scope);

        scope.$digest();
      });

      return element;
    }

    it('should print all the relevant information', function() {
      var element = compileFzField({
        label: 'My Label',
        placeholder: 'My Placeholder',
        documentation: 'My Docs',
        value: 'My Value'
      });
 
      expect(element.find('label').text()).toBe('* My Label:');
      var input = element.find('div.controls input[type=text]');
      expect(input.attr('placeholder')).toBe('My Placeholder');
      expect(input.val()).toBe('My Value');

      // this replace is just a trim()
      expect(element.find('span.help-block').text().replace(/(^\s+|\s+$)/g, '')).toBe('My Docs');
    });
  });
});