/*global angular */

/**
 * Controller to order list and order service connection.
 */
angular
	.module('orders')
	.controller('OrderListController', [
		'$scope',
		'$routeParams',
		'OrderService',
		'ordersData',
		OrderListCtrl
	]);

function OrderListCtrl($scope, $routeParams, OrderService, ordersData) {
	'use strict';

	var vm = this,
		TAP_COMPLETED = 'completed',
		TAP_ACTIVE = 'active';

	vm.orderService = OrderService;
	vm.isAllCompleted = OrderService.isAllOrderCompleted();
	vm.orders = ordersData;

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
	$scope.$on('$routeChangeSuccess', function () {
		vm.status = $routeParams.status || '';
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
}
