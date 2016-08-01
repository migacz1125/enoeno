/*global angular */

angular
	.module('login')
	.factory('LoginService', ['OrderStorage', LoginService]);

function LoginService(OrderStorage) {
	'use strict';

	var newOrder = {completed: false, title: ''},

		/**
		 * Return is order editing canceled.
		 *
		 * @returns {boolean}
		 */
		isCanceled = function () {
			return true;
		}
	//console.log('----- scope.user: ', $scope.user);
	return {
		/**
		 * Get new empty order object.
		 *
		 * @returns {{completed: boolean, title: string}}
		 */
		getNewOrder: function () {
			//return newOrder;
		},

		/**
		 * Load orders collection from backend data.
		 *
		 * @returns {Array}
		 */
		loadOrders: function () {
			//return OrderStorage.get().then(function (ordersCollection) {
			//	orders = ordersCollection;
			//
			//	orders.map(function (item) {
			//		item.isEditMode = false;
			//	});
			//	return ordersCollection;
			//}.bind(this));
		}
	};
};