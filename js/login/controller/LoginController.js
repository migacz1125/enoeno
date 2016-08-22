/*global angular */

/**
 * Controller to order list and order service connection.
 */
angular
	.module('orders')
	.controller('LoginController', [
		'$scope',
		'$location',
		'$auth',
		LoginCtrl
	]);

function LoginCtrl($scope, $location, $auth) {
	'use strict';
	var vm = this;

	vm.login = function() {
		$auth.login($scope.user)
			.then(function() {
				//toastr.success('You have successfully signed in!');
				$location.path('');
			})
			.catch(function(error) {
				//toastr.error(error.data.message, error.status);
			});
	};

	vm.authenticate = function(provider) {
		$auth.authenticate(provider)
			.then(function() {
				$location.path('');
			})
			.catch(function(error) {});
	};

	/**
	 * Clean up memory after destroy component.
	 */
	$scope.$on('$destroy', function(){
		vm = null;
		$scope = null;
	});
}
