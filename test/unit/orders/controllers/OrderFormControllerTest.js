/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('OrderFormController Test', function () {
		var scope, ctrl, auth;

		beforeEach(
			inject(function ($rootScope, $controller, OrderService, OrderStatusService, RestaurantService, $auth) {
				scope = $rootScope.$new();
				auth = $auth;

				ctrl = $controller('OrderFormController', {
					$scope: scope,
					OrderService: OrderService,
					OrderStatusService: OrderStatusService,
					restaurantsData: {},
					userData: {},
					$auth: $auth,
					RestaurantService: RestaurantService
				});
			}
		));

		it('Should default value after create', function () {
			expect(ctrl.orderService).toBeDefined();
			expect(ctrl.orderStatusService).toBeDefined();
			expect(ctrl.restaurantService).toBeDefined();
			expect(ctrl.restaurants).toBeDefined();
			expect(ctrl.user).toBeDefined();
			expect(ctrl.isAddOrderEnabled).toBeFalsy();
		});

		it('Should watch to change selected meal value', function () {
			ctrl.restaurantService.selectedMeal = 'meal';
			scope.$digest();
			expect(ctrl.isAddOrderEnabled).toBeTruthy();
		});

		it('Set selected meal as empty should disabled add btn', function () {
			ctrl.restaurantService.selectedMeal = null;
			scope.$digest();
			expect(ctrl.restaurantService.selectedMeal).toBeNull();
			expect(ctrl.isAddOrderEnabled).toBeFalsy();
		});

		it('isAuthenticated: should call isAuthenticated form auth service', function () {
			spyOn(auth, 'isAuthenticated');

			ctrl.isAuthenticated();

			expect(auth.isAuthenticated).toHaveBeenCalled();
		});

		it('addOrder should add new item to storage', function () {
			var priceValue = 20,
				mealName = 'meal',
				restaurantName = 'restaurant',
				userName = 'user';

			ctrl.user = userName;
			ctrl.restaurantService.selectedMeal = {name: mealName, price: priceValue};
			ctrl.restaurantService.selectedRestaurant = {name: restaurantName};

			spyOn(ctrl.orderService, 'getNewOrder').and.returnValue({
				completed: false,
				title: '',
				user: null,
				price:'',
				date:''
			});
			spyOn(ctrl.orderService, 'addOrder');

			ctrl.addOrder();

			expect(ctrl.orderService.getNewOrder).toHaveBeenCalledWith();
			expect(ctrl.orderService.addOrder).toHaveBeenCalledWith({
				completed: false,
				title: restaurantName + ' - ' + mealName,
				user: userName,
				price: priceValue,
				date:''
			});
		});

		it('should clean memeory after destroy', function () {
			spyOn(ctrl, 'clearAfterDestroy');
			scope.$destroy();
			expect(ctrl.clearAfterDestroy).toHaveBeenCalled();
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
