/*global angular */

/**
 * Controller to order list and order service connection.
 */
angular
	.module('orders')
	.controller('LogoutController', [
		'$scope',
		'$location',
		'$auth',
		LogoutCtrl
	]);

function LogoutCtrl($scope, $location, $auth) {
	'use strict';

	var vm = this;

	if (!$auth.isAuthenticated()) { return; }

	$auth.logout()
		.then(function() {
			//toastr.info('You have been logged out');
			$location.path('/login');
		});

	/**
	 * Clean up memory after destroy component.
	 */
	$scope.$on('$destroy', function(){
		vm = null;
		$scope = null;
	});
}
