'use strict';

describe('service', function() {
	var $httpBackend;

  beforeEach(function() {
    module('formz.services');
    inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('locales/en-us.js').
	      respond({help: 'No help.'});
    })
  });

	describe('The localization service', function() {
		it('should localize a given string', inject(function(fzLocalization) {
			expect(fzLocalization.string("help")).toEqual("help");

			$httpBackend.flush();

			expect(fzLocalization.string("help")).toEqual('No help.');
		}));

		it("should return the same string when it's no possible to localize it", inject(function(fzLocalization) {
			expect(fzLocalization.string("unlocalizable")).toEqual('unlocalizable');
			$httpBackend.flush();
			expect(fzLocalization.string("unlocalizable")).toEqual('unlocalizable');
		}));

	});
});