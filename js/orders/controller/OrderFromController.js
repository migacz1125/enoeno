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

	console.log('------ OrderFromCtrl:userData: ', userData);
	console.log('------ OrderFromCtrl:restaurantsData: ', restaurantsData);

	var vm = this;

	vm.orderService = OrderService;
	vm.restaurants = restaurantsData;
	vm.user = userData;
	vm.restaurantService = RestaurantService;
	vm.selectedRestaurant = RestaurantService.getSelectedRestaurant();
	vm.selectedMeal = RestaurantService.getSelectedMeal();
	vm.showRestaurantMenu = false;

	/**
	 * Listener to all changes om orders.
	 */
	$scope.$watch('OrderFromCtrl.selectedRestaurant', function () {
//		vm.remainingCount = OrderService.getNumOfActive();
//		vm.completedCount = OrderService.getNumOfCompleted();
		console.log('--- OrderFromCtrl watch restaurant selected: ');
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
		console.log('----- FormCtrl:addOrder');
		console.log('----- FormCtrl:addOrder:vm.selectedRestaurant: ', vm.selectedRestaurant);
		console.log('----- FormCtrl:addOrder:vm.selectedMeal: ', vm.selectedMeal);

		var order = OrderService.getNewOrder();
		order.title = vm.selectedMeal.name;

		OrderService.addOrder(order);
	};
}
