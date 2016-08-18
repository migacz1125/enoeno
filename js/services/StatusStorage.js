/*global angular */

/**
 * Service that persists and retrieves order list status from local storage.
 */
angular
	.module('orders')
	.factory('StatusStorage', ['$q', StatusStorage]);

function StatusStorage($q) {
	'use strict';

	var STORAGE_ID = 'status-storage',
		status = 0,

		_getFromLocalStorage = function () {
			return localStorage.getItem(STORAGE_ID || 0);
		},
		_saveToLocalStorage = function (status) {
			localStorage.setItem(STORAGE_ID, status);
		};

	return {
		get: function () {
			var deferred = $q.defer();

			status = parseInt(_getFromLocalStorage());
			deferred.resolve(status);

			return deferred.promise;
		},

		put: function (status, index) {
			var deferred = $q.defer();

			_saveToLocalStorage(status);
			deferred.resolve(status);

			return deferred.promise;
		}
	};
};
