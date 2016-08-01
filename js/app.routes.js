/*global angular */

/**
 * The main ordering routing module
 *
 * @type {angular.Module}
 */
angular.module('orders.routes', ['ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		'use strict';

		var routeConfig = {
			url: '/',
			templateUrl: 'js/templates/home.html',
			controller: 'OrderListController as OrderListCtrl',
			resolve: {
				ordersData: function (OrderService) {
					return OrderService.loadOrders();
				}
			}
		};

		console.log('----- test -----');
		$stateProvider
			.state('all', routeConfig)
			.state('active', {
				url: '/:status',
				templateUrl: 'js/templates/home.html',
				controller: 'OrderListController as OrderListCtrl',
				resolve: {
					ordersData: function (OrderService) {
						return OrderService.loadOrders();
					}
				}
			})
			.state('completed', {
				url: '/:status',
				templateUrl: 'js/templates/home.html',
				controller: 'OrderListController as OrderListCtrl',
				resolve: {
					ordersData: function (OrderService) {
						return OrderService.loadOrders();
					}
				}
			});

			//.state('active', routeConfig)
			//.state('completed', routeConfig);
			//.state('/:status', routeConfig);

		$urlRouterProvider.otherwise('/');
	});