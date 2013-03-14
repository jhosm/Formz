'use strict';

// Courtesy from: http://jsfiddle.net/8bENp/139/
angular.module('formz.directives').
directive('fzMarkdown', function MarkdownFactory() {
	var converter = new Showdown.converter();
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			attrs.$observe('text', function(value) {
				var htmlText = converter.makeHtml(value);
				element.html(htmlText);
			});
		}
	}
});