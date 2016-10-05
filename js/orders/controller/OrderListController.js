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
		OrderListCtrl
	]);

function OrderListCtrl($scope, OrderService, ordersData, $auth, $state) {
	'use strict';

	var vm = this,
		TAP_COMPLETED = 'completed',
		TAP_ACTIVE = 'active';

	vm.orderService = OrderService;
	vm.isAllCompleted = vm.orderService.isAllOrderCompleted();
	vm.orders = ordersData;

	/**
	 * Listener to all changes om orders.
	 */
	$scope.$watch('OrderListCtrl.orders', function () {
		vm.remainingCount = vm.orderService.getNumOfActive();
		vm.completedCount = vm.orderService.getNumOfCompleted();
		vm.isAllCompleted = vm.orderService.isAllOrderCompleted();
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
		vm.clearAfterDestroy();
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

	vm.clearAfterDestroy = function () {
		vm = null;
		$scope = null;
	};
}
