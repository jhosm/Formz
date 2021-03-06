(function() {
  'use strict';


  describe('directives', function() {

    describe('The fzFieldSet directive', function() {

      beforeEach(module('formz.directives', 'partials/directives/fzFieldSet.html', 'partials/directives/fzField.html'));

      beforeEach(
      module(function($provide) {
        var mock = {
          string: angular.noop
        };
        $provide.value('fzLocalization', mock);
      }));

      function compileFzFieldSet(model) {
        var element;

        inject(function($compile, $rootScope) {
          var scope = $rootScope;

          scope.model = model;

          element = angular.element('<fz-fieldset data="model"/>');
          $compile(element)(scope);

          scope.$digest();
        });

        return element;
      }

      it('should handle a basic model', function() {
        var element = compileFzFieldSet({
          "name": " a name",
          "children": [],
          "label": "a label",
          "documentation": "some documentation",
          "placeholder": "a placeholder",
          "value": "a value"
        });

        expect(element.find('legend').text()).toBe('a label');

        var expectedFieldset = element.find('legend')[0].parentElement;
        expect(expectedFieldset.tagName).toBe('FIELDSET');

        expect(element.find('input').val()).toBe('a value');
      });

      it('should handle a model with a child', function() {
        var element = compileFzFieldSet({
          name: 'person',
          children: [{
            name: '@gender',
            value: 'male'
          }]
        });

        expect(element.find('input').val()).toBe('male');
      });

      it('should handle a model with more than one child', function() {
        var element = compileFzFieldSet({
          name: 'person',
          children: [{
            name: '@gender',
            value: 'male'
          }, {
            name: '@height',
            value: '1.86'
          }]
        });

        _.each(element.find('input[type="text"]'), function(elm, idx) {
          if (idx === 0) expect(elm.value).toBe('male');
          if (idx === 1) expect(elm.value).toBe('1.86');
        });
      });
    });
  });
}());