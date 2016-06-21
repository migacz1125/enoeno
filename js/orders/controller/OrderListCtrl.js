/*global angular */

/**
 * Controller to order list and order service connection.
 */
angular.module('orders').controller('OrderListCtrl', [
	'$scope',
	'$routeParams',
	'OrderService',
	'ordersData',
	function($scope, $routeParams, OrderService, ordersData) {
		'use strict';

		var controller = this;
		$scope.orderService = OrderService;

		/**
		 * Listener to all changes om oreder service.
		 */
		$scope.$watch('orderService.orders', function () {
			$scope.remainingCount = OrderService.getNumOfActive();
			$scope.completedCount = OrderService.getNumOfCompleted();
			$scope.isAllCompleted = OrderService.isAllOrderCompleted();
		}, true);

		/**
		 * Monitor the current route for changes and adjust the filter accordingly.
		 */
		$scope.$on('$routeChangeSuccess', function () {
			$scope.status = $routeParams.status || '';
			$scope.statusFilter = ($scope.status === 'active') ?
				{ completed: false } : ($scope.status === 'completed') ?
				{ completed: true } : {};
		});

		/**
		 * Clean up memory after destroy component.
		 */
		$scope.$on('$destroy', function(){
			controller = null;
			$scope     = null;
		});
	}]);
