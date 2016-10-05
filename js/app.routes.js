/*global angular */

/**
 * The main ordering routing module
 *
 * @type {angular.Module}
 */
angular.module('orders.routes', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';

		var loginRequired = function($q, $auth, $location) {
			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				deferred.resolve();
			} else {
				$location.path('/login');
			}
			return deferred.promise;
		};

		/**
		 * Helper auth functions
		 */
		var skipIfLoggedIn = function($q, $auth) {

			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				deferred.reject();
			} else {
				deferred.resolve();
			}

			return deferred.promise;
		};

		/**
		 * Routs definitions.
		 */
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'js/templates/login.html',
				controller: 'LoginController as LoginCtrl',
				resolve: {
					skipIfLoggedIn: skipIfLoggedIn
				}
			})
			.state('logout', {
				url: '/logout',
				template: null,
				controller: 'LogoutController as LogoutCtrl'
			})
			.state('home', {
				url: '',
				views: {
					'': {
						templateUrl: './js/templates/home.html',
						controller: 'OrderListController as OrderListCtrl',
						resolve: {
							loginRequired: loginRequired,
							ordersData: function (OrderService) {
								return OrderService.loadOrders();
							}
						}
					},
					'top@home': {
						templateUrl: './js/templates/top.html',
						controller: 'OrderFormController as OrderFormCtrl',
						resolve: {
							loginRequired: loginRequired,
							restaurantsData: function (RestaurantService) {
								return RestaurantService.loadRestaurant();
							},
							userData: function(AccountService) {
								return AccountService.getUserData();
							},
							listStatus: function (OrderStatusService) {
								OrderStatusService.loadListStatus();
							}
						}
					},
					'menu@home': {
						templateUrl: './js/templates/menu-top.html',
						controller: 'MenuController as MenuCtrl'
					}
				}
			})
			.state('home.list', {
				url: '/',
				templateUrl: './js/templates/order-list.html'
			})
			.state('home.active', {
				url: '/:status',
				templateUrl: './js/templates/order-list.html'
			})
			.state('home.completed', {
				url: '/:status',
				templateUrl: './js/templates/order-list.html'
			});

		$urlRouterProvider.otherwise('');
	});