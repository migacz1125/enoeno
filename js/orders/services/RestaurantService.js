/*global angular */

angular
	.module('orders')
	.factory('RestaurantService', ['RestaurantStorage', RestaurantService]);

function RestaurantService(RestaurantStorage) {
	'use strict';

	var restaurants = null,
		selectedMeal = null,
		selectedRestaurant = null;

	return {
		/**
		 * Load orders collection from backend data.
		 *
		 * @returns {Array}
		 */
		loadRestaurant: function () {
			if (restaurants !== null) {
				return restaurants;
			}

			return RestaurantStorage.get().then(function (restaurantsCollection) {
				restaurants = restaurantsCollection;
				return restaurantsCollection;
			}.bind(this));
		},

		getSelectedRestaurant: function () {
			return selectedRestaurant;
		},

		setSelectedRestaurant: function (selectedItem) {
			selectedRestaurant = selectedItem;
		},

		getSelectedMeal: function () {
			return selectedMeal;
		},

		setSelectedMeal: function (selectedItem) {
			selectedMeal = selectedItem;
		}
	};
};