/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('OrderService Tests', function () {
		var sut,
			scope,
			orderStorage,
			accountService,
			orderStatusService,
			q,
			exampleOrder = {
				completed: false,
				title: 'test',
				user: {_id:1, email:null, displayName:'Bartosz Gerono', picture:'', github:6169713},
				price: 20,
				date: '2016-09-29T22:00:00.000Z'
			},
			currentDate = new Date();

		currentDate.setHours(0);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		currentDate.setMilliseconds(0);

		beforeEach(
			inject(function (OrderService, $rootScope, OrderStorage, AccountService, $q, OrderStatusService) {
				scope = $rootScope.$new();
				sut = OrderService;
				orderStorage = OrderStorage;
				accountService = AccountService;
				orderStatusService = OrderStatusService;
				q = $q;
			}
		));

		it('Should be define default value after init service', function () {
			expect(sut.getNewOrder).toBeDefined();
			expect(sut.loadOrders).toBeDefined();
			expect(sut.addOrder).toBeDefined();
			expect(sut.isUserOrderedToday).toBeDefined();
			expect(sut.updateOrder).toBeDefined();
			expect(sut.removeOrder).toBeDefined();
			expect(sut.clearCompletedOrders).toBeDefined();
			expect(sut.markAll).toBeDefined();
			expect(sut.isAllOrderCompleted).toBeDefined();
			expect(sut.getNumOfActive).toBeDefined();
			expect(sut.getNumOfCompleted).toBeDefined();
			expect(sut.isOrderRemoveEnabled).toBeDefined();
		});

		it('getNewOrder: should return new order object', function () {
			expect(sut.getNewOrder()).toEqual({completed: false, title: '', user: null, price: '', date: ''});
		});

		it('loadOrders: should return orders collection', function () {
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
		});

		it('loadOrders: should return orders collection when orders are loaded yet.', function () {
			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			sut.loadOrders();
			scope.$digest();

			sut.loadOrders();

			expect(orderStorage.get.calls.count()).toEqual(1);

			expect(sut.getOrders()[0].date).toEqual(new Date(exampleOrder.date));
			expect(sut.getOrders()[0].price).toEqual(exampleOrder.price);
			expect(sut.getOrders()[0].title).toEqual(exampleOrder.title);
			expect(sut.getOrders()[0].completed).toEqual(exampleOrder.completed);
			expect(sut.getOrders()[0].user).toEqual(exampleOrder.user);
		});

		it('addOrders: should add new order to storage.', function () {
			spyOn(orderStorage, 'insert').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve();
				return deferred.promise;
			});

			sut.addOrder(angular.copy(exampleOrder));
			scope.$digest();

			exampleOrder.date = currentDate;

			expect(orderStorage.insert).toHaveBeenCalledWith(exampleOrder);
		});

		it('addOrders: should no add new order if title is empty.', function () {
			spyOn(orderStorage, 'insert');

			exampleOrder.title = '';

			sut.addOrder(angular.copy(exampleOrder));

			expect(orderStorage.insert.calls.any()).toBeFalsy();
		});

		it('isUserOrderedToday: should response is user order meal today.', function () {
			var user = {_id:1, email:null, displayName:'Bartosz Gerono', picture:'', github:6169713};

			exampleOrder.date = currentDate;

			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			sut.loadOrders();
			scope.$digest();

			expect(sut.isUserOrderedToday(user)).toBeTruthy();
			user._id = 2;
			expect(sut.isUserOrderedToday(user)).toBeFalsy();
		});

		it('updateOrder: should update order in storage', function () {
			spyOn(orderStorage, 'put').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve();
				return deferred.promise;
			});

			sut.updateOrder(exampleOrder);

			expect(orderStorage.put).toHaveBeenCalledWith(exampleOrder);
		});

		it('removeOrder: should update order in storage.', function () {
			spyOn(orderStorage, 'delete');

			sut.removeOrder(exampleOrder);

			expect(orderStorage.delete).toHaveBeenCalledWith(exampleOrder);
		});

		it('markAll: should update all orders completed as false.', function () {
			exampleOrder.completed = true;

			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			spyOn(sut, 'updateOrder');

			sut.loadOrders();
			scope.$digest();

			sut.markAll(true);

			exampleOrder.completed = false;

			expect(sut.updateOrder).toHaveBeenCalledWith(exampleOrder);
		});

		it('markAll: should update all orders completed as true.', function () {
			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			spyOn(sut, 'updateOrder');

			sut.loadOrders();
			scope.$digest();

			sut.markAll(false);

			exampleOrder.completed = true;

			expect(sut.updateOrder).toHaveBeenCalledWith(exampleOrder);
		});

		it('markAll: should return true.', function () {
			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			sut.loadOrders();
			scope.$digest();

			expect(sut.isAllOrderCompleted()).toBeTruthy();
		});

		it('markAll: should return false.', function () {
			exampleOrder.completed = false;

			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			sut.loadOrders();
			scope.$digest();

			expect(sut.isAllOrderCompleted()).toBeFalsy();
		});

		it('getNumOfActive: should return number of active orders.', function () {
			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			sut.loadOrders();
			scope.$digest();

			expect(sut.getNumOfActive()).toEqual(1);
		});

		it('getNumOfCompleted: should return number of active orders.', function () {
			spyOn(orderStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([angular.copy(exampleOrder)]);
				return deferred.promise;
			});

			sut.loadOrders();
			scope.$digest();

			expect(sut.getNumOfCompleted()).toEqual(0);
		});

		it('isOrderRemoveEnabled: should return true.', function () {
			var user = {_id:1, email:null, displayName:'Bartosz Gerono', picture:'', github:6169713};

			spyOn(accountService, 'getUserData').and.returnValue(user);
			spyOn(orderStatusService, 'isOrderActive').and.returnValue(true);

			var response = sut.isOrderRemoveEnabled(exampleOrder);

			expect(response).toBeTruthy();
		});

		it('isOrderRemoveEnabled: should return false if order from other user.', function () {
			var user = {_id:2, email:null, displayName:'Bartosz Gerono', picture:'', github:6169713};

			spyOn(accountService, 'getUserData').and.returnValue(user);
			spyOn(orderStatusService, 'isOrderActive').and.returnValue(true);

			var response = sut.isOrderRemoveEnabled(exampleOrder);

			expect(response).toBeFalsy();
		});

		it('isOrderRemoveEnabled: should return false if ordered status is close.', function () {
			var user = {_id:1, email:null, displayName:'Bartosz Gerono', picture:'', github:6169713};

			spyOn(accountService, 'getUserData').and.returnValue(user);
			spyOn(orderStatusService, 'isOrderActive').and.returnValue(false);

			var response = sut.isOrderRemoveEnabled(exampleOrder);

			expect(response).toBeFalsy();
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
