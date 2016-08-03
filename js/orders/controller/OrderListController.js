/*global angular */

/**
 * Controller to order list and order service connection.
 */
angular
	.module('orders')
	.controller('OrderListController', [
		'$scope',
		'$stateParams',
		'OrderService',
		'ordersData',
		'$auth',
		'AccountService',
		OrderListCtrl
	]);

function OrderListCtrl($scope, $stateParams, OrderService, ordersData, $auth, AccountService) {
	'use strict';

	console.log('------ OrderListController:init');

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
		console.log('----- change orders !');

		vm.remainingCount = OrderService.getNumOfActive();
		vm.completedCount = OrderService.getNumOfCompleted();
		vm.isAllCompleted = OrderService.isAllOrderCompleted();
	}, true);

	/**
	 * Monitor the current route for changes and adjust the filter accordingly.
	 */
	$scope.$on('$stateChangeSuccess', function () {
		console.log('------ OrderListController:$stateChangeSuccess');

		vm.status = $stateParams.status || '';
		console.log('----- vm.status: ', vm.status);

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

	vm.getUserData = function () {
		console.log('====== getUserData');
		AccountService.getProfile()
			.then(function(response) {
				//$scope.user = response.data;
				console.log('----- response.data: ', response.data);
				vm.user = response.data;
			})
			.catch(function(response) {
				//toastr.error(response.data.message, response.status);
				console.log('----- response.error.status: ', response.status);
			});
	};

	vm.getUserData();
}
