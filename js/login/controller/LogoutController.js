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
			$location.path('/');
		});

	/**
	 * Listener to all changes om orders.
	 */
	/*$scope.$watch('OrderListCtrl.orders', function () {
		vm.remainingCount = OrderService.getNumOfActive();
		vm.completedCount = OrderService.getNumOfCompleted();
		vm.isAllCompleted = OrderService.isAllOrderCompleted();
	}, true);*/

	/**
	 * Monitor the current route for changes and adjust the filter accordingly.
	 */
	/*$scope.$on('$routeChangeSuccess', function () {
		vm.status = $routeParams.status || '';
		vm.statusFilter = (vm.status === TAP_ACTIVE) ?
			{ completed: false } : (vm.status === TAP_COMPLETED) ?
			{ completed: true } : {};
	});*/

	/**
	 * Clean up memory after destroy component.
	 */
	$scope.$on('$destroy', function(){
		vm = null;
		$scope = null;
	});
}
