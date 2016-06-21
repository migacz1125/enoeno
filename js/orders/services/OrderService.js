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
	this.editOrder = function (order) {
		console.log('----- editOrder: ', order);
		order.isEditMode = true;
		this.oldOrder = angular.extend({}, order);
	};

	/**
	 * If user press 'Esc' key during editing item.
	 *
	 * @param {Object} order
	 */
	this.revertEdits = function (order) {

		order.title = this.oldOrder.title;

		this.updateOrder(order);

		order.isEditMode = false;
		this.oldOrder = null;
		this.setIsCanceled(true);
	};


	/**
	 * Save order item after editing.
	 *
	 * @param {Object} order
	 */
	this.saveEdits = function (order) {
		console.log('------ saveEdits:order: ', order);
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
	 * @param {boolean} completed
	 */
	this.markAll = function (completed) {
		this.orders.forEach(function (order) {
			if (order.completed !== completed) {
				order.completed = !order.completed;

				this.updateOrder(order);
			}
		}, this);
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