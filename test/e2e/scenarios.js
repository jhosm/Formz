'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Formz', function() {

  beforeEach(function() {
//    angular.module('formz', []).value('teste',123);
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /form/human.xsd when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/form/human");
  });

  describe('form tabs', function() {
    it('should be able to choose a tab', function() {
      element("a:contains('Pessoas')").click();
      input('form.rootElement.value').enter('Joao');
      expect(element('#xml').text()).toMatch('<person>Joao</person>');

      element("a:contains('Casas')").click();
      input('form.rootElement.value').enter('myHouse');
      expect(element('#xml').text()).toMatch('<house>myHouse</house>');
    });
  });

  describe('form', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/form/human');
    });


    it('should render form when user navigates to /form/human', function() {
      expect(element('legend').text()).toMatch(/Form/);
    });

    it('should update the xml when user types some data', function() {
      input('form.rootElement.value').enter('Joao');
      expect(element('#xml').text()).toMatch('<person>Joao</person>');
    });

    it('should toggle the xml visibility when user toggles "Show XML"', function() {
      expect(element('#controlGroupXml').css('display')).toBe('none');
      input('showXml').check();
      expect(element('#controlGroupXml').css('display')).toBe('block');
      input('showXml').check();
      expect(element('#controlGroupXml').css('display')).toBe('none');
    });

    it('should toggle the json visibility when user toggles "Show JSON"', function() {
      expect(element('#controlGroupJson').css('display')).toBe('none');
      input('showJson').check();
      expect(element('#controlGroupJson').css('display')).toBe('block');
      input('showJson').check();
      expect(element('#controlGroupJson').css('display')).toBe('none');
    });
  });
});
