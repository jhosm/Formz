'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Formz', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /form/human.xsd when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/form/human");
  });

  describe('form tabs', function() {
    it('should be able to choose a tab', function() {
      element("a:contains('Pessoas')").click();
      input('data.value').enter('Joao');
      expect(element('#xml').text()).toMatch('<person>Joao</person>');

      element("a:contains('Casas')").click();

      expect(repeater('div[title="Casas"] div[data="field"]').count()).toBe(3);
    });
  });

  describe('form', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/form/human');
    });

    it('should render form when user navigates to /form/human', function() {
      expect(element('legend').text()).toMatch(/Pessoa/);
    });

    it('should update the xml when user types some data', function() {
      input('data.value').enter('Joao');
      expect(element('#xml').text()).toMatch('<person>Joao</person>');
    });

    it('should toggle the xml visibility when user toggles "Show XML"', function() {
      expect(element('#controlGroupXml').css('display')).toBe('none');
      input('showXml').check();
      expect(element('#controlGroupXml').css('display')).toBe('block');
      input('showXml').check();
      expect(element('#controlGroupXml').css('display')).toBe('none');
    });

    it('should toggle the debug info visibility when user toggles "Show Debug"', function() {
      expect(element('#controlGroupDebug').css('display')).toBe('none');
      input('showDebug').check();
      expect(element('#controlGroupDebug').css('display')).toBe('block');
      input('showDebug').check();
      expect(element('#controlGroupDebug').css('display')).toBe('none');
    });
  });

  describe('fzFieldSet', function() {
    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/form/house');
    });

    it('should show error message when required field is empty, but dirty', function() {
      var saveButton = element('div[title="Casas"] button.save');
      var controlGroupElm = element('div[title="Casas"] div.control-group');
      var requiredMessageElm = element('div[title="Casas"] span.required-message');

      expect(saveButton.text()).toBe('Save');
      expect(saveButton.attr('disabled')).toBe('disabled');

      input('data.value').enter('1');
      expect(saveButton.attr('disabled')).not().toBeDefined();
      expect(controlGroupElm.attr('class')).not().toContain('error');
      expect(requiredMessageElm.css('display')).toBe('none');
      
      input('data.value').enter('');
      expect(controlGroupElm.attr('class')).toContain('error');
      expect(saveButton.attr('disabled')).toBe('disabled');
      expect(requiredMessageElm.css('display')).toBe('inline-block');
    });
  });
});
