/*global angular */

/**
 * Service that persists and retrieves orders from local storage.
 */
angular.module('orders').factory('OrderStorage', ['$q', function ($q) {
	'use strict';

	var STORAGE_ID = 'orders-storage',
		orders = [],
		_getFromLocalStorage = function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		_saveToLocalStorage = function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		};

	return {
		clearCompleted: function () {
			var deferred = $q.defer();

			var incompleteTodos = orders.filter(function (todo) {
				return !todo.completed;
			});

			angular.copy(incompleteTodos, orders);

			_saveToLocalStorage(orders);
			deferred.resolve(orders);

			return deferred.promise;
		},

		delete: function (todo) {
			var deferred = $q.defer();

			orders.splice(orders.indexOf(todo), 1);

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

		insert: function (todo) {
			var deferred = $q.defer();

			orders.push(todo);

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
}]);
