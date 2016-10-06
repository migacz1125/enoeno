/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('RestaurantServiceTest Tests', function () {
		var sut,
			scope,
			restaurantStorage,
			q,
			exampleRestaurant = {
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
			};

		beforeEach(
			inject(function (RestaurantService, $rootScope, RestaurantStorage, $q) {
				scope = $rootScope.$new();
				sut = RestaurantService;
				restaurantStorage = RestaurantStorage;
				q = $q;
			}
		));

		it('Should be define default value and method after init service', function () {
			expect(sut.loadRestaurant).toBeDefined();
			expect(sut.getSelectedRestaurant).toBeDefined();
			expect(sut.setSelectedRestaurant).toBeDefined();
			expect(sut.getSelectedMeal).toBeDefined();
			expect(sut.setSelectedMeal).toBeDefined();
		});

		it('loadRestaurant: should return restaurant collection', function () {
			spyOn(restaurantStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([exampleRestaurant]);
				return deferred.promise;
			});

			sut.loadRestaurant();
			scope.$digest();

		    expect(restaurantStorage.get).toHaveBeenCalled();
			expect(sut.getRestaurants()).toEqual([exampleRestaurant]);
		});

		it('loadRestaurant: if load restaurant second time should return collection from local variable', function () {
			spyOn(restaurantStorage, 'get').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve([exampleRestaurant]);
				return deferred.promise;
			});

			sut.loadRestaurant();
			scope.$digest();

			sut.loadRestaurant();

			expect(restaurantStorage.get.calls.count()).toEqual(1);
			expect(sut.getRestaurants()).toEqual([exampleRestaurant]);
		});

		it('getSelectedRestaurant: should return null if restaurnat is not set', function () {
			expect(sut.getSelectedRestaurant()).toBeNull();
		});

		it('setSelectedRestaurant, getSelectedRestaurant: should return restaurant item if item is set before', function () {
			sut.setSelectedRestaurant(exampleRestaurant);

			expect(sut.getSelectedRestaurant()).toEqual(exampleRestaurant);
		});


		it('setSelectedMeal: should return null if meal is not set yet', function () {
			expect(sut.getSelectedMeal()).toBeNull();
		});

		it('getSelectedMeal, setSelectedMeal: should return meal item if item is set before', function () {
			sut.setSelectedMeal(exampleRestaurant.menu[0]);

			expect(sut.getSelectedMeal()).toEqual(exampleRestaurant.menu[0]);
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
