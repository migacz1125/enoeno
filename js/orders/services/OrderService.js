/*global angular */

angular
	.module('orders')
	.factory('OrderService', ['OrderStorage', OrderService]);

function OrderService(OrderStorage) {
	'use strict';

	var newOrder = {completed: false, title: ''},
		canceled = false,
		orders = null,
		oldOrder = null,

		/**
		 * Return is order editing canceled.
		 *
		 * @returns {boolean}
		 */
		isCanceled = function () {
			return canceled;
		},

		/**
		 * @param {boolean} cancel
		 */
		setIsCanceled = function (cancel) {
			canceled = cancel;
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
				orders.map(function (item) {
					item.isEditMode = false;
				});
				return ordersCollection;
			}.bind(this));
		},

		/**
		 * Add new order item to collection.
		 */
		addOrder: function () {
			if (!newOrder.title) {
				return;
			}

			OrderStorage.insert(newOrder).then(function success() {
				newOrder = {completed: false, title: ''};
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
		 * Assign old value of order item during editing.
		 *
		 * @param {Object} order
		 */
		editOrder: function ($event, order) {
			$event.stopPropagation();

			order.isEditMode = true;
			oldOrder = angular.extend({}, order);
		},

		/**
		 * If user press 'Esc' key during editing item.
		 *
		 * @param {Object} order
		 */
		revertEdits: function ($event, order) {
			$event.stopPropagation();

			order.title = oldOrder.title;
			order.isEditMode = false;

			this.updateOrder(order);
			oldOrder = null;
			setIsCanceled(true);
		},

		/**
		 * Save order item after editing.
		 *
		 * @param {Object} order
		 */
		saveEdits: function ($event, order) {
			$event.stopPropagation();

			if (isCanceled()) {
				setIsCanceled(false);
				return;
			}

			if (order.title === oldOrder.title) {
				order.isEditMode = false;
				return;
			}

			if (order.title) {
				this.updateOrder(order);
			} else {
				this.removeOrder(order);
			}

			order.isEditMode = false;
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