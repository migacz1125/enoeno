/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('OrderFormController Test', function () {
		var scope, ctrl;

		beforeEach(
			inject(function ($rootScope, $controller, OrderService, RestaurantService) {

				scope = $rootScope.$new();
				ctrl = $controller('OrderFormController', {
					$scope: scope,
					OrderService: OrderService,
					restaurantsData: {},
					userData: {},
					$auth: {},
					RestaurantService: RestaurantService }
				);
			}
		));

		it('Should default value after create', function () {
			expect(ctrl.orderService).toBeDefined();
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

//		it('should clean memeory after destroy', function () {
//			spyOn(ctrl, 'clearAfterDestroy');
//			scope.$destroy();
//			expect(ctrl.clearAfterDestroy).toHaveBeenCalled();
//		});

//		afterEach(function() {
//			scope.$destroy();
//		});
	});
}());
