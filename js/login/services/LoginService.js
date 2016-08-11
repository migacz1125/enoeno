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
		loadOrders: function () {}
	};
};