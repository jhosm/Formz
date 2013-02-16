'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /xsdForm/definitions.xsd when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/xsdForm/definitions.xsd");
  });


  describe('xsd form', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html#/xsdForm/definitions.xsd');
    });


    it('should render xsdForm when user navigates to /xsdForm/definitions.xsd', function() {
      expect(element('legend').text()).toMatch(/XSD Form/);
    });

    it('should update the xml when user types some data', function() {
      input('xmlSchema.rootElement.value').enter('Joao');
      expect(element('#xml').text()).toMatch('<person>Joao</person>');
    });
  });
});
