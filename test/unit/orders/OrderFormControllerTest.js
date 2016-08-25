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

		it('Should default isMenuOpen default value', function () {
//			expect(ctrl.isMenuOpen).toBeFalsy();
//			expect(ctrl.orderService).toBeDefined();
		});

		it('Should change isMenuOpen value', function () {
//			expect(ctrl).toBeDefined();
//			ctrl.showHideMenu();
//			expect(ctrl.isMenuOpen).toBeTruthy();
//			ctrl.showHideMenu();
//			expect(ctrl.isMenuOpen).toBeFalsy();
		});

		it('should clean memeory after destroy', function () {
//			spyOn(ctrl, 'clearAfterDestroy');
//			scope.$destroy();
//			expect(ctrl.clearAfterDestroy).toHaveBeenCalled();
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
