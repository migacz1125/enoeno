angular.module('orders', ['ngRoute', 'ui.router', 'satellizer', 'ngMaterial', 'orders.routes', 'angular.filter'])
	.config(function($authProvider, $windowProvider) {
		'use strict';
		$authProvider.github({
			clientId: '3532eda80a0f3b9f16a1',
			authorizationEndpoint: 'https://github.com/login/oauth/authorize',
			redirectUri: $windowProvider.$get().location.origin || $windowProvider.$get().location.protocol + '//' + $windowProvider.$get().location.host,
			optionalUrlParams: ['scope'],
			scope: ['user:email'],
			scopeDelimiter: ' ',
			oauthType: '2.0',
			popupOptions: { width: 1020, height: 618 }
		});

		$authProvider.oauth2({
			name: 'foursquare',
			url: '/auth/foursquare',
			clientId: 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
			redirectUri: $windowProvider.$get().location.origin || $windowProvider.$get().location.protocol + '//' + $windowProvider.$get().location.host,
			authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
		});

		$authProvider.baseUrl = 'http://localhost:3000';
		$authProvider.withCredentials = false;
	})
	.config(function($mdThemingProvider) {
		'use strict';

		$mdThemingProvider.theme('default')
			.primaryPalette('orange', {
				'default': '800'
			})
			.accentPalette('orange', {
				'default': '200'
			});
	});