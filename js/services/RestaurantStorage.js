/*global angular */

/**
 * Service that persists and retrieves restaurant and our menu on local storage.
 */
angular
	.module('orders')
	.factory('RestaurantStorage', ['$q', RestaurantStorage]);

function RestaurantStorage($q) {
	'use strict';

	var restaurantData = [{
		'id': 0,
		'name': 'ThaiVet',
		'menu': [
			{
				'name': 'Wołowina po tajsku',
				'price': '13.99'
			},
			{
				'name': 'Kaczka po chińsku',
				'price': '17.99'
			},
			{
				'name': 'Kurzczak curry zielone',
				'price': '12.99'
			},
			{
				'name': 'Krewetki w pięciu smakach',
				'price': '20.00'
			}
		]
	}, {
		'id': 1,
		'name': 'Greenway',
		'menu': [
			{
				'name': 'Kofta z pieca',
				'price': '16.99'
			},
			{
				'name': 'Placki z ciecierzycy',
				'price': '15.99'
			},
			{
				'name': 'Zapiekanka z cukinii',
				'price': '15.99'
			},
			{
				'name': 'Gulasz z soji',
				'price': '13.00'
			}
		]
	}];

	var STORAGE_ID = 'restaurant-storage',
		restaurants = [],

		_getFromLocalStorage = function () {
			return angular.fromJson(localStorage.getItem(STORAGE_ID) || '[]');
		},
		_saveToLocalStorage = function (restaurantsData) {
			localStorage.setItem(STORAGE_ID, angular.toJson(restaurantsData));
		};

	_saveToLocalStorage(restaurantData);

	return {
		loadRestaurantsData: function () {
			var deferred = $q.defer();

			var incompleteTodos = restaurants.filter(function (todo) {
				return !todo.completed;
			});

			angular.copy(incompleteTodos, restaurants);

			_saveToLocalStorage(restaurants);
			deferred.resolve(restaurants);

			return deferred.promise;
		},

		delete: function (restaurant) {
			var deferred = $q.defer();

			restaurants.splice(restaurants.indexOf(restaurant), 1);

			_saveToLocalStorage(restaurants);
			deferred.resolve(restaurants);

			return deferred.promise;
		},

		get: function () {
			var deferred = $q.defer();

			angular.copy(_getFromLocalStorage(), restaurants);

			deferred.resolve(restaurants);

			return deferred.promise;
		},

		insert: function (restaurant) {
			var deferred = $q.defer();

			restaurants.push(restaurant);

			_saveToLocalStorage(restaurants);
			deferred.resolve(restaurants);

			return deferred.promise;
		},

		put: function (restaurant, index) {
			var deferred = $q.defer();

			restaurants[restaurants.indexOf(restaurant)] = restaurant;

			_saveToLocalStorage(restaurants);
			deferred.resolve(restaurants);

			return deferred.promise;
		}
	};
};
