/*global angular */

/**
 * Controller to order list and order service connection.
 */
angular
	.module('orders')
	.controller('OrderFromController', [
		'$scope',
		'OrderService',
		'restaurantsData',
		'userData',
		'$auth',
		'RestaurantService',
		OrderFromCtrl
	]);

function OrderFromCtrl($scope, OrderService, restaurantsData, userData, $auth, RestaurantService) {
	'use strict';

	var vm = this;

	vm.orderService = OrderService;
	vm.restaurants = restaurantsData;
	vm.user = userData;
	vm.restaurantService = RestaurantService;
	vm.selectedRestaurant = RestaurantService.getSelectedRestaurant();
	vm.selectedMeal = RestaurantService.getSelectedMeal();
	vm.showRestaurantMenu = false;

	/**
	 * Listener to restaurant changes.
	 */
	$scope.$watch('OrderFromCtrl.selectedRestaurant', function () {
		if (vm.selectedRestaurant !== null) {
			//show additional select
			vm.restaurantService.setSelectedRestaurant(vm.selectedRestaurant);
			vm.showRestaurantMenu = true;
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
		var order = OrderService.getNewOrder();

		order.userAvatar = vm.user.picture;
		order.userName = vm.user.displayName;
		order.title = vm.selectedRestaurant.name + ' - ' + vm.selectedMeal.name;
		order.price = vm.selectedMeal.price;

		OrderService.addOrder(order);
	};
}
