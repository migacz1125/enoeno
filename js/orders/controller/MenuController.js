/**
 * Controller to menu order list state
 */
angular
	.module('orders')
	.controller('MenuController', [
		'$scope',
		'OrderService',
		MenuCtrl
	]);

function MenuCtrl($scope, OrderService) {
	'use strict';

	var vm = this;
	vm.orderService = OrderService;
	vm.isMenuOpen = false;

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
