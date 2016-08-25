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
	$scope.$watch('OrderFormCtrl.restaurantService.selectedMeal', function (value) {
		if (value) {
			vm.isAddOrderEnabled = true;
		}
	}, true);

	/**
	 * Clean up memory after destroy component.
	 */
	$scope.$on('$destroy', function(){
		vm = null;
		$scope = null;
	});

	vm.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};

	vm.addOrder = function () {
		var order = OrderService.getNewOrder(),
			selectedMeal = vm.restaurantService.selectedMeal;

		order.user = vm.user;
		order.title = vm.restaurantService.selectedRestaurant.name + ' - ' + selectedMeal.name;
		order.price = selectedMeal.price;

		OrderService.addOrder(order);
	};
}
