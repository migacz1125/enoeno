/*global angular */

angular
	.module('orders')
	.factory('OrderStatusService', ['StatusStorage', OrderStatusService]);

function OrderStatusService(StatusStorage) {
	'use strict';

	var orderListStatus = 0;

	var STATUS_OPEN = 0,
		STATUS_FINALIZED = 1,
		STATUS_ORDERED = 2,
		STATUS_DELIVERED = 3;

	return {
		loadListStatus: function () {
			StatusStorage.get().then(function (status) {
				orderListStatus = status;
				return status;
			});
		},

		updateListStatus: function (status) {
			StatusStorage.put(status).then(function success() {

			});
		},

		openOrdering: function () {
			orderListStatus = STATUS_OPEN;
			this.updateListStatus(STATUS_OPEN);
		},

		finalizedOrdering: function () {
			orderListStatus = STATUS_FINALIZED;
			this.updateListStatus(STATUS_FINALIZED);
		},

		orderedOrders: function () {
			orderListStatus = STATUS_ORDERED;
			this.updateListStatus(STATUS_ORDERED);
		},

		deliveredOrders: function () {
			orderListStatus = STATUS_DELIVERED;
			this.updateListStatus(STATUS_DELIVERED);
			this.markAll(false);
		},

		isOrderActive: function () {
			return orderListStatus === STATUS_OPEN;
		},

		isOrderFinalized: function () {
			return orderListStatus === STATUS_FINALIZED;
		},

		isOrderOrdered: function () {
			return orderListStatus === STATUS_ORDERED;
		},

		isOrderDelivered: function () {
			return orderListStatus === STATUS_DELIVERED;
		}
	};
};