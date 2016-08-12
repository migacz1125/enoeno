/*global angular */

/**
 * Controller to order list and order service connection.
 */
angular
	.module('orders')
	.controller('OrderListController', [
		'$scope',
		'OrderService',
		'ordersData',
		'$auth',
		'$state',
		'RestaurantService',
		OrderListCtrl
	]);

function OrderListCtrl($scope, OrderService, ordersData, $auth, $state, RestaurantService) {
	'use strict';

	console.log('------ OrderListCtrl');
	var vm = this,
		TAP_COMPLETED = 'completed',
		TAP_ACTIVE = 'active';

	vm.orderService = OrderService;
	vm.isAllCompleted = OrderService.isAllOrderCompleted();
	vm.orders = ordersData;
	vm.restaurantService = RestaurantService;

	/**
	 * Listener to all changes om orders.
	 */
	$scope.$watch('OrderListCtrl.orders', function () {
		vm.remainingCount = OrderService.getNumOfActive();
		vm.completedCount = OrderService.getNumOfCompleted();
		vm.isAllCompleted = OrderService.isAllOrderCompleted();
	}, true);

	/**
	 * Monitor the current route for changes and adjust the filter accordingly.
	 */
	$scope.$on('$stateChangeSuccess', function () {
		vm.status = $state.params.status || '';

		if (vm.status === '') {
			$state.go('home.list');
		}

		vm.statusFilter = (vm.status === TAP_ACTIVE) ?
			{ completed: false } : (vm.status === TAP_COMPLETED) ?
			{ completed: true } : {};
	});

	/**
	 * Clean up memory after destroy component.
	 */
	$scope.$on('$destroy', function(){
		vm = null;
		$scope = null;
	});

	/**
	 * @returns {boolean}
	 */
	vm.isActiveTap = function() {
		return (vm.status === TAP_ACTIVE);
	};

	/**
	 * @returns {boolean}
	 */
	vm.isCompletedTap = function() {
		return (vm.status === TAP_COMPLETED);
	};

	vm.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};
}
