/**
 * Controller to order list and order service connection.
 */
angular
	.module('orders')
	.controller('OrderFormController', [
		'$scope',
		'OrderService',
		'restaurantsData',
		'userData',
		'$auth',
		'RestaurantService',
		OrderFormCtrl
	]);

function OrderFormCtrl($scope, OrderService, restaurantsData, userData, $auth, RestaurantService) {
	'use strict';

	var vm = this;

	vm.orderService = OrderService;
	vm.restaurants = restaurantsData;
	vm.user = userData;
	vm.restaurantService = RestaurantService;
	vm.isAddOrderEnabled = false;

	/**
	 * Listener to all changes om orders.
	 */
	$scope.$watch('OrderFormCtrl.restaurantService.selectedMeal', function () {
		if (vm.restaurantService.selectedMeal) {
			vm.isAddOrderEnabled = true;
		}
	}, true);

	/**
	 * Clean up memory after destroy component.
	 */
	$scope.$on('$destroy', function(){
		vm.clearAfterDestroy();
	});

	vm.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};

	vm.addOrder = function () {
		var order = vm.orderService.getNewOrder(),
			selectedMeal = vm.restaurantService.selectedMeal;

		order.user = vm.user;
		order.title = vm.restaurantService.selectedRestaurant.name + ' - ' + selectedMeal.name;
		order.price = selectedMeal.price;

		vm.orderService.addOrder(order);
	};

	vm.clearAfterDestroy = function () {
		vm = null;
		$scope = null;
	};
}
