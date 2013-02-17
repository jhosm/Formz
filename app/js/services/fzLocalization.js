'use strict;'

angular.module('definitionsCenter.services').
service('fzLocalization', ['$resource', '$cacheFactory', '$locale', function($resource, $cacheFactory, $locale) {
	var cache = $cacheFactory('fzLocalization');
	var Localization = $resource('locales/:localeId.js', {localeId : $locale.id});


	function string(key) {
		var strings = cache.get('strings');
		if(!strings) {
			strings = Localization.get(angular.noop);
			cache.put('strings', strings);  
		}
		if(angular.isUndefined(strings[key])) return key;
		return strings[key];
	}

	return {
		'string': string
	};
}]);