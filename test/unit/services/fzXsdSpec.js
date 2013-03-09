'use strict';

describe('Services', function() {

	beforeEach(module('formz.services'));
	beforeEach(module('xsd/samples/simpleElement.xsd'));
	beforeEach(module('xsd/samples/simpleElement_minimalData.xsd'));
	beforeEach(module('xsd/samples/simpleElement_targetNamespace.xsd'));
	beforeEach(module('xsd/samples/simpleElement_complexType_oneAttribute.xsd'));
	beforeEach(module('xsd/samples/simpleElement_complexType_twoAttributes.xsd'));
	beforeEach(module('xsd/samples/simpleElement_complexType_complexContent_extension.xsd'));
	beforeEach(module('xsd/samples/simpleElement_complexType_attributeGroup.xsd'));

	describe('The xml schema parser', function() {
		var xsd, templateCache;
		
		function getXsd(name) {
			return templateCache.get('xsd/samples/' + name + '.xsd');
		}

		beforeEach(inject(function(fzXsd, $templateCache) {
			xsd = fzXsd;
			templateCache = $templateCache;
		}));

		it('should parse a simple element with all the basic info', function() {
			var rootElement = xsd.parse(getXsd('simpleElement')).rootElement;

			expect(rootElement.name).toBe('person');
			expect(rootElement.label).toBe('Pessoa');
			expect(rootElement.documentation).toBe('Humano');
			expect(rootElement.placeholder).toBe('Nome da Pessoa');
			expect(rootElement.children.length).toBe(0);
		});

		it('should set a default documentation message when none is available', function() {
			var parsedSchema = xsd.parse(getXsd('simpleElement_minimalData'));

			expect(parsedSchema.rootElement.documentation).toBe('.no-help');
		});

		it('should set a default target namespace when one is available', function() {
			var parsedSchema = xsd.parse(getXsd('simpleElement'));
			expect(parsedSchema.namespace).toBe(null);

			var parsedSchema = xsd.parse(getXsd('simpleElement_targetNamespace'));
			expect(parsedSchema.namespace).toBe('http://formz.com/ANamespace');
		});

		it("should set the name of the element as it's label if none is specified", function() {
			var parsedSchema = xsd.parse(getXsd('simpleElement_minimalData'));

			expect(parsedSchema.rootElement.label).toBe('person');
		});

		it("should define an empty placeholder when the element doesn't have one", function() {
			var parsedSchema = xsd.parse(getXsd('simpleElement_minimalData'));

			expect(parsedSchema.rootElement.placeholder).toBe('');
		});

		describe('when parsing a schema with a complex type', function() {
			it('should parse a complex type with an atttribute', function() {
				var rootElement = xsd.parse(getXsd('simpleElement_complexType_oneAttribute')).rootElement;

				expect(rootElement.name).toBe('person');
				expect(rootElement.label).toBe('Pessoa');
				expect(rootElement.documentation).toBe('Humano');
				expect(rootElement.placeholder).toBe('');

				expect(rootElement.children.length).toBe(1);
				var attribute = rootElement.children[0];

				expect(attribute.name).toBe('@name');
				expect(attribute.label).toBe('Nome');
				expect(attribute.documentation).toBe('Indicar nome da pessoa');
				expect(attribute.placeholder).toBe('Nome da Pessoa');
			});

			it('should parse a complex type with two atttributes', function() {
				var rootElement = xsd.parse(getXsd('simpleElement_complexType_twoAttributes')).rootElement;

				expect(rootElement.children.length).toBe(2);
				var attribute = rootElement.children[0];

				expect(attribute.name).toBe('@name');
				expect(attribute.label).toBe('Nome');
				expect(attribute.documentation).toBe('Indicar nome da pessoa');
				expect(attribute.placeholder).toBe('Nome da Pessoa');

				var attribute = rootElement.children[1];

				expect(attribute.name).toBe('@genre');
				expect(attribute.label).toBe('Género');
				expect(attribute.documentation).toBe('Indicar género da pessoa');
				expect(attribute.placeholder).toBe('Género da Pessoa');
			});

			it('should parse a complex type with an extension', function() {
				var rootElement = xsd.parse(getXsd('simpleElement_complexType_complexContent_extension')).rootElement;

				// Make sure the uiInfo elements are not overriden by the extension's uiinfo...
				expect(rootElement.label).toBe('Pessoa');
				
				expect(rootElement.children.length).toBe(3);

				// "Inherited" attribute.
				var attribute = rootElement.children[2];
				expect(attribute.name).toBe('@furColor');
			});		

			it('should parse a complex type with an attribute group', function() {
				var rootElement = xsd.parse(getXsd('simpleElement_complexType_attributeGroup')).rootElement;

				expect(rootElement.children.length).toBe(1);

				// "Inherited" attribute.
				var attribute = rootElement.children[0];
				expect(attribute.name).toBe('@color');
			});	
		});

		it("should give a clear explanation when it doesn't find a root element", function() {
			var noRootElement = '<?xml version="1.0"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"></xs:schema>';

			expect(function() {
				xsd.parse(noRootElement);
			}).toThrow('xsd service: Could not find a root element definition on this Xml Schema.');
		});

		it("should give a clear explanation when it doesn't find a type", function() {
			var unknownType = '<?xml version="1.0"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="aName" type="unknownType"/></xs:schema>';

			expect(function() {
				xsd.parse(unknownType);
			}).toThrow('xsd service: Could not find a referenced type named "unknownType".');
		});

		it("should give a clear explanation when it doesn't find a type's extension", function() {
			var unknownType = '<?xml version="1.0"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="aName" type="aType"/><xs:complexType name="aType"><xs:complexContent><xs:extension base="unknownType"/></xs:complexContent></xs:complexType></xs:schema>';

			expect(function() {
				xsd.parse(unknownType);
			}).toThrow('xsd service: Could not find a referenced type named "unknownType".');
		});

		it("should give a clear explanation when it doesn't find a referenced attribute group", function() {
			var unknownAttributeGroup = '<?xml version="1.0"?><xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="aName"><xs:attributeGroup ref="unknownAttributeGroup" /></xs:element></xs:schema>';

			expect(function() {
				xsd.parse(unknownAttributeGroup);
			}).toThrow('xsd service: Could not find a referenced attributeGroup named "unknownAttributeGroup".');
		});
	});
});