/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('MenuController Tests', function () {
		var scope, ctrl;

		beforeEach(
			inject(function ($rootScope, $controller, OrderStatusService) {
				scope = $rootScope.$new();
				ctrl = $controller('MenuController', { $scope: scope, OrderStatusService: OrderStatusService});
			}
		));

		it('Should default isMenuOpen default value', function () {
			expect(ctrl.isMenuOpen).toBeFalsy();
			expect(ctrl.orderStatusService).toBeDefined();
		});

		it('Should change isMenuOpen value', function () {
			expect(ctrl).toBeDefined();
			ctrl.showHideMenu();
			expect(ctrl.isMenuOpen).toBeTruthy();
			ctrl.showHideMenu();
			expect(ctrl.isMenuOpen).toBeFalsy();
		});

		it('should clean memeory after destroy', function () {
			spyOn(ctrl, 'clearAfterDestroy');
			scope.$destroy();
			expect(ctrl.clearAfterDestroy).toHaveBeenCalled();
		});

		it('deliveredStatusAndMarkAllOrder: should delivered status and mark all orders.', function () {
			spyOn(ctrl.orderStatusService, 'deliveredOrders');
			spyOn(ctrl.orderService, 'markAll');

			ctrl.deliveredStatusAndMarkAllOrder();

			expect(ctrl.orderStatusService.deliveredOrders).toHaveBeenCalled();
			expect(ctrl.orderService.markAll).toHaveBeenCalledWith(false);
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
