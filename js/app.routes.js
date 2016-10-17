/*global angular */

/**
 * The main ordering routing module
 *
 * @type {angular.Module}
 */
angular.module('orders.routes', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';

		/**
		 * Routs definitions.
		 */
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'js/templates/login.html',
				controller: 'LoginController as LoginCtrl',
				resolve: {
					skipIfLoggedIn: function (AccountService) {
						return AccountService.skipIfLoggedIn();
					}
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
							loginRequired: function (AccountService) {
								return AccountService.loginRequired();
							},
							ordersData: function (OrderService) {
								return OrderService.loadOrders();
							}
						}
					},
					'top@home': {
						templateUrl: './js/templates/top.html',
						controller: 'OrderFormController as OrderFormCtrl',
						resolve: {
							loginRequired: function (AccountService) {
								return AccountService.loginRequired();
							},
							restaurantsData: function (RestaurantService) {
								return RestaurantService.loadRestaurant();
							},
							userData: function(AccountService) {
								return AccountService.loadUserData();
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