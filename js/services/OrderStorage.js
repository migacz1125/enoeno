/*global angular */

/**
 * Service that persists and retrieves orders from local storage.
 */
angular
	.module('orders')
	.factory('OrderStorage', ['$q', OrderStorage]);

function OrderStorage($q) {
	'use strict';

	var STORAGE_ID = 'orders-storage',
		orders = [],

		_getFromLocalStorage = function () {
			return angular.fromJson(localStorage.getItem(STORAGE_ID) || '[]');
		},
		_saveToLocalStorage = function (orders) {
			localStorage.setItem(STORAGE_ID, angular.toJson(orders));
		};

	return {
		clearCompleted: function () {
			var deferred = $q.defer();

			var incompleteOrders = orders.filter(function (order) {
				return !order.completed;
			});

			angular.copy(incompleteOrders, orders);

			_saveToLocalStorage(orders);
			deferred.resolve(orders);

			return deferred.promise;
		},

		delete: function (order) {
			var deferred = $q.defer();

			orders.splice(orders.indexOf(order), 1);

			_saveToLocalStorage(orders);
			deferred.resolve(orders);

			return deferred.promise;
		},

		get: function () {
			var deferred = $q.defer();

			angular.copy(_getFromLocalStorage(), orders);

			deferred.resolve(orders);

			return deferred.promise;
		},

		insert: function (order) {
			var deferred = $q.defer();

			orders.push(order);

			_saveToLocalStorage(orders);
			deferred.resolve(orders);

			return deferred.promise;
		},

		put: function (order, index) {
			var deferred = $q.defer();

			orders[orders.indexOf(order)] = order;

			_saveToLocalStorage(orders);
			deferred.resolve(orders);

			return deferred.promise;
		}
	};
};
