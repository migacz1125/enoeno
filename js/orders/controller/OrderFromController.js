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
	vm.isMenuOpen = false;

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

		order.userAvatar = vm.user.picture;
		order.userName = vm.user.displayName;
		order.title = vm.restaurantService.selectedRestaurant.name + ' - ' + selectedMeal.name;
		order.price = selectedMeal.price;

		OrderService.addOrder(order);
	};

	vm.showHideMenu = function() {
		vm.isMenuOpen = !vm.isMenuOpen;
	};
}
