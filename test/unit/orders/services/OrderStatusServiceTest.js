/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('OrderStatusService Tests', function () {
		var sut,
			scope,
			statusStorage,
			q;

		beforeEach(
			inject(function (OrderStatusService, $rootScope, StatusStorage, $q) {
				scope = $rootScope.$new();
				sut = OrderStatusService;
				statusStorage = StatusStorage;
				q = $q;
			}
		));

		it('Should be define default value after init service', function () {
			expect(sut.loadListStatus).toBeDefined();
			expect(sut.openOrdering).toBeDefined();
			expect(sut.finalizedOrdering).toBeDefined();
			expect(sut.orderedOrders).toBeDefined();
			expect(sut.deliveredOrders).toBeDefined();
			expect(sut.isOrderActive).toBeDefined();
			expect(sut.isOrderFinalized).toBeDefined();
			expect(sut.isOrderOrdered).toBeDefined();
			expect(sut.isOrderDelivered).toBeDefined();
		});

		it('loadListStatus: should return status value', function () {
			spyOn(statusStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve(0);
				return deferred.promise;
			});

			sut.loadListStatus();
			scope.$digest();

		    expect(statusStorage.get).toHaveBeenCalled();
			expect(sut.getStatus()).toEqual(0);
		});

		it('updateListStatus: should put actual status', function () {
			spyOn(statusStorage, 'put').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve();
				return deferred.promise;
			});

			sut.updateListStatus(1);
			scope.$digest();

			expect(statusStorage.put).toHaveBeenCalledWith(1);
		});

		it('openOrdering: should change status as OPEN', function () {
			spyOn(sut, 'updateListStatus');

			sut.openOrdering();

			expect(sut.updateListStatus).toHaveBeenCalledWith(0);
			expect(sut.getStatus()).toEqual(0);
		});

		it('finalizedOrdering: should change status as STATUS_FINALIZED', function () {
			spyOn(sut, 'updateListStatus');

			sut.finalizedOrdering();

			expect(sut.updateListStatus).toHaveBeenCalledWith(1);
			expect(sut.getStatus()).toEqual(1);
		});

		it('orderedOrders: should change status as STATUS_ORDERED', function () {
			spyOn(sut, 'updateListStatus');

			sut.orderedOrders();

			expect(sut.updateListStatus).toHaveBeenCalledWith(2);
			expect(sut.getStatus()).toEqual(2);
		});

		it('deliveredOrders: should change status as STATUS_DELIVERED', function () {
			spyOn(sut, 'updateListStatus');

			sut.deliveredOrders();

			expect(sut.updateListStatus).toHaveBeenCalledWith(3);
			expect(sut.getStatus()).toEqual(3);
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
