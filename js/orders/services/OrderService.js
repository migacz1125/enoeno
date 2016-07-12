/*global angular */

angular.module('orders').service('OrderService', ['OrderStorage', function(OrderStorage) {
	var newOrder = {completed: false, title: ''},
		canceled = false;

	this.oldOrder = null;
	this.orders = [];

	this.remainingCount = null;

	/**
	 * Return is order editing canceled.
	 *
	 * @returns {boolean}
	 */
	this.isCanceled = function () {
		return canceled;
	};

	/**
	 *
	 * @param {boolean} cancel
	 */
	this.setIsCanceled = function (cancel) {
		canceled = cancel;
	};

	/**
	 * Get new order object.
	 *
	 * @returns {{completed: boolean, title: string}}
	 */
	this.getNewOrder = function () {
		return newOrder;
	};

	/**
	 * Load orders collection from backend data.
	 *
	 * @returns {Array}
	 */
	this.loadOrders = function() {
		return OrderStorage.get().then(function (ordersCollection) {
			this.orders = ordersCollection;

			this.orders.map(function(item) {
				item.isEditMode = false;
			});
			return ordersCollection;
		}.bind(this));
	};

	/**
	 * Add new order item to collection.
	 */
	this.addOrder = function() {
		if (!newOrder.title) {
			return;
		}

		OrderStorage.insert(newOrder).then(function success() {
				newOrder = {completed: false, title: ''};
			});
	};

	/**
	 * Remove order item from collection.
	 *
	 * @param order
	 */
	this.removeOrder = function (order) {
		OrderStorage.delete(order);
	};

	/**
	 * Remove all completed orders from collection.
	 */
	this.clearCompletedOrders = function () {
		OrderStorage.clearCompleted();
	};

	/**
	 * Update data about target order in collection.
	 *
	 * @param {Object} order
	 */
	this.updateOrder = function (order) {
		OrderStorage.put(order).then(function success() {

		}, function error() {});
	};

	/**
	 * Assign old value of order item during editing.
	 *
	 * @param {Object} order
	 */
	this.editOrder = function ($event, order) {
		$event.stopPropagation();

		order.isEditMode = true;
		this.oldOrder = angular.extend({}, order);
	};

	/**
	 * If user press 'Esc' key during editing item.
	 *
	 * @param {Object} order
	 */
	this.revertEdits = function ($event, order) {
		$event.stopPropagation();

		order.title = this.oldOrder.title;
		order.isEditMode = false;

		this.updateOrder(order);
		this.oldOrder = null;
		this.setIsCanceled(true);
	};


	/**
	 * Save order item after editing.
	 *
	 * @param {Object} order
	 */
	this.saveEdits = function ($event, order) {
		$event.stopPropagation();

		if (this.isCanceled()) {
			this.setIsCanceled(false);
			return;
		}

		if (order.title === this.oldOrder.title) {
			order.isEditMode = false;
			return;
		}

		if (order.title) {
			this.updateOrder(order);
		} else {
			this.removeOrder(order);
		}

		order.isEditMode = false;
	};

	/**
	 * Mark all order item as completed or uncompleted by arg value.
	 *
	 * @param {boolean} isCompletedAll
	 */
	this.markAll = function (isCompletedAll) {
		if (isCompletedAll) {
			this.orders.forEach(function (order) {
				order.completed = false;
				this.updateOrder(order);
			}, this);
		} else {
			this.orders.forEach(function (order) {
				if (!order.completed) {
					order.completed = true;
					this.updateOrder(order);
				}
			}, this);
		}
	};

	/**
	 * Check that all orders item are completed.
	 *
	 * @returns {boolean}
	 */
	this.isAllOrderCompleted = function() {
		var ordersCompleted = this.orders.filter(function(order) {
			return (order.completed === true);
		});

		return (ordersCompleted.length === this.orders.length);
	};

	/**
	 * Return number of active orders.
	 *
	 * @returns {Number}
	 */
	this.getNumOfActive = function() {
		return this.orders.filter(function(order) {
			return (order.completed === false);
		}).length;
	};

	/**
	 * Return number of active orders.
	 *
	 * @returns {Number}
	 */
	this.getNumOfCompleted = function() {
		return this.orders.filter(function(order) {
			return (order.completed === true);
		}).length;
	};
}]);