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
//			expect(sut.isOrderRemoveEnabled).toBeDefined();
		});

		it('getNewOrder: should return new order object', function () {
//			expect(sut.getNewOrder()).toEqual({completed: false, title: '', user: null, price: '', date: ''});
		});

		/*it('loadOrders: should return orders collection', function () {
			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			sut.loadOrders();
			scope.$digest();

		    expect(orderStorage.get).toHaveBeenCalled();
			expect(sut.getOrders()[0].date).toEqual(new Date(exampleOrder.date));
			expect(sut.getOrders()[0].price).toEqual(exampleOrder.price);
			expect(sut.getOrders()[0].title).toEqual(exampleOrder.title);
			expect(sut.getOrders()[0].completed).toEqual(exampleOrder.completed);
			expect(sut.getOrders()[0].user).toEqual(exampleOrder.user);
		});*/

		/*afterEach(function() {
			scope.$destroy();
		});*/
	});
}());
