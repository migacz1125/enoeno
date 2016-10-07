/*global angular */

angular
	.module('orders')
	.factory('OrderService', ['OrderStorage', OrderService]);

function OrderService(OrderStorage) {
	'use strict';

	var newOrder = {
		completed: false,
		title: '',
		user: null,
		price:'',
		date:''
	},
		orders = null;

	var _getCurrentDate = function () {
		var currentDate = new Date();

		currentDate.setHours(0);
		currentDate.setMinutes(0);
		currentDate.setSeconds(0);
		currentDate.setMilliseconds(0);

		return currentDate;
	};

	return {
		/**
		 * Get new empty order object.
		 *
		 * @returns {{completed: boolean, title: string}}
		 */
		getNewOrder: function () {
			return newOrder;
		},

		/**
		 * Load orders collection from backend data.
		 *
		 * @returns {Array}
		 */
		loadOrders: function () {
			if (orders !== null) {
				return orders;
			}

			return OrderStorage.get().then(function (ordersCollection) {
				orders = ordersCollection;

				ordersCollection.map(function (item) {
					item.date = new Date(item.date);
					return item;
				});

				return ordersCollection;
			}.bind(this));
		},

		getOrders: function () {
			return orders;
		},

		/**
		 * Add new order item to collection.
		 */
		addOrder: function (newOrderItem) {
			if (!newOrderItem.title) {
				return;
			}

			newOrderItem.date = _getCurrentDate();

			OrderStorage.insert(newOrderItem).then(function success() {
				newOrder = {
					completed: false,
					title: '',
					user: null,
					price:'',
					date:''
				};
			});
		},

		/**
		 * Check that user order meal today yet.
		 *
		 * @param {Object} user
		 * @returns {boolean}
		 */
		isUserOrderedToday: function (user) {
			var response = orders.some(function(order) {
				return (
					order.user._id === user._id &&
					Number(order.date) === Number(_getCurrentDate())
				);
			});

			return response;
		},

		/**
		 * Update data about target order in collection.
		 *
		 * @param {Object} order
		 */
		updateOrder: function (order) {
			OrderStorage.put(order).then(function success() {

			}, function error() {
			});
		},

		/**
		 * Remove order item from collection.
		 *
		 * @param order
		 */
		removeOrder: function (order) {
			OrderStorage.delete(order);
		},

		/**
		 * Remove all completed orders from collection.
		 */
		clearCompletedOrders: function () {
			OrderStorage.clearCompleted();
		},

		/**
		 * Mark all order item as completed or uncompleted by arg value.
		 *
		 * @param {boolean} isCompletedAll
		 */
		markAll: function (isCompletedAll) {
			if (isCompletedAll) {
				orders.forEach(function (order) {
					order.completed = false;
					this.updateOrder(order);
				}, this);
			} else {
				orders.forEach(function (order) {
					if (!order.completed) {
						order.completed = true;
						this.updateOrder(order);
					}
				}, this);
			}
		},

		/**
		 * Check that all orders item are completed.
		 *
		 * @returns {boolean}
		 */
		isAllOrderCompleted: function () {
			var ordersCompleted = orders.filter(function (order) {
				return (order.completed === true);
			});

			return (ordersCompleted.length === orders.length);
		},

		/**
		 * Return number of active orders.
		 *
		 * @returns {Number}
		 */
		getNumOfActive: function () {
			return orders.filter(function (order) {
				return (order.completed === false);
			}).length;
		},

		/**
		 * Return number of active orders.
		 *
		 * @returns {Number}
		 */
		getNumOfCompleted: function () {
			return orders.filter(function (order) {
				return (order.completed === true);
			}).length;
		}
	};
};