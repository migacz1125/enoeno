/**
 * Controller to menu order list state
 */
angular
	.module('orders')
	.controller('MenuController', [
		'$scope',
		'OrderStatusService',
		'OrderService',
		MenuCtrl
	]);

function MenuCtrl($scope, OrderStatusService, OrderService) {
	'use strict';

	var vm = this;
	vm.isMenuOpen = false;
	vm.orderStatusService = OrderStatusService;
	vm.orderService = OrderService;

	/**
	 * Clean up memory after destroy component.
	 */
	$scope.$on('$destroy', function(){
		vm.clearAfterDestroy();
	});

	vm.showHideMenu = function() {
		vm.isMenuOpen = !vm.isMenuOpen;
	};

	vm.clearAfterDestroy = function () {
		vm = null;
		$scope = null;
	};

	vm.deliveredStatusAndMarkAllOrder = function() {
		vm.orderStatusService.deliveredOrders();
		vm.orderService.markAll(false);
	};
}
