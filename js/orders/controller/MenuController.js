/**
 * Controller to menu order list state
 */
angular
	.module('orders')
	.controller('MenuController', [
		'$scope',
		'OrderStatusService',
		MenuCtrl
	]);

function MenuCtrl($scope, OrderStatusService) {
	'use strict';

	var vm = this;
	vm.isMenuOpen = false;
	vm.orderStatusService = OrderStatusService;

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
}
