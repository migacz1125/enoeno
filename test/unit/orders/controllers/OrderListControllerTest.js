/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('OrderListControllerTest', function () {
		var scope,
			ctrl,
			state,
			auth;

		beforeEach(
			function() {
				inject(function ($rootScope, $controller, OrderService, $state, $auth) {
					scope = $rootScope.$new();
					state = $state;
					auth = $auth;

					ctrl = $controller('OrderListController', {
						$scope: scope,
						OrderService: {
							isAllOrderCompleted: jasmine.createSpy(),
							getNumOfActive: jasmine.createSpy(),
							getNumOfCompleted: jasmine.createSpy()
						},
						ordersData: {},
						$auth: $auth,
						$state: $state
					});
				});
			}
		);

		it('Should default value after init', function () {
			ctrl.orderService.isAllOrderCompleted.and.returnValue(false);

			scope.$digest();

			expect(ctrl.orderService).toBeDefined();
			expect(ctrl.isAllCompleted).toBeFalsy();
			expect(ctrl.orders).toEqual({});
			expect(ctrl.orderService.isAllOrderCompleted).toHaveBeenCalled();

		});

		it('AFter change orders should recalculate completed and active items', function () {
			var numCompleted = 1,
				numActive = 0,
				isAllCompleted = true;

			ctrl.orderService.getNumOfActive.and.returnValue(numActive);
			ctrl.orderService.getNumOfCompleted.and.returnValue(numCompleted);
			ctrl.orderService.isAllOrderCompleted.and.returnValue(isAllCompleted);

			scope.$digest();

			expect(ctrl.remainingCount).toEqual(numActive);
			expect(ctrl.completedCount).toEqual(numCompleted);
			expect(ctrl.isAllCompleted).toEqual(isAllCompleted);
		});

		it('After change to empty state should go to home screen', function () {
			spyOn(state, 'go');

		    scope.$broadcast('$stateChangeSuccess');

			expect(state.go).toHaveBeenCalledWith('home.list');
			expect(ctrl.statusFilter).toEqual({});
		});

		it('After change state to active should change filter status', function () {
			state.params.status = 'active';
			spyOn(state, 'go');

			scope.$broadcast('$stateChangeSuccess');

			expect(state.go.calls.any()).toEqual(false);
			expect(ctrl.statusFilter).toEqual({completed: false});
		});

		it('After change state to completed should change filter status', function () {
			state.params.status = 'completed';
			spyOn(state, 'go');

			scope.$broadcast('$stateChangeSuccess');

			expect(state.go.calls.any()).toEqual(false);
			expect(ctrl.statusFilter).toEqual({completed: true});
		});

		it('should clean memeory after destroy', function () {
			 spyOn(ctrl, 'clearAfterDestroy');
			 scope.$destroy();
			 expect(ctrl.clearAfterDestroy).toHaveBeenCalled();
		 });

		it('isActiveTap: should return false if status is no active', function () {
			expect(ctrl.isActiveTap()).toBeFalsy();
		});

		it('isActiveTap: should return true if status is active', function () {
			ctrl.status = 'active';
			expect(ctrl.isActiveTap()).toBeTruthy();
		});

		it('isCompletedTap: should return false if status is no completed', function () {
			expect(ctrl.isCompletedTap()).toBeFalsy();
		});

		it('isCompletedTap: should return true if status is completed', function () {
			ctrl.status = 'completed';
			expect(ctrl.isCompletedTap()).toBeTruthy();
		});

		it('isAuthenticated: should call authenticated from auth service', function () {
			spyOn(auth, 'isAuthenticated');

			ctrl.isAuthenticated();

			expect(auth.isAuthenticated).toHaveBeenCalled();
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
