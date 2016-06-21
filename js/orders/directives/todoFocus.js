/*global angular */

/**
 * Directive that places focus on the element it is applied to when the
 * expression it binds to evaluates to true
 */
angular.module('orders')
	.directive('todoFocus', function todoFocus($timeout) {
		'use strict';

		return function (scope, element, attrs) {
			scope.$watch(attrs.todoFocus, function (newVal) {
				if (newVal) {
					console.log('---- set focus to edit element !!!');
					console.log('---- elem: ', element);
					$timeout(function() {
						element[0].focus();
					});
				}
			});
		};
	});
