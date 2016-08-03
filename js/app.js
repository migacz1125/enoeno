angular.module('orders', ['ngRoute', 'ui.router', 'satellizer', 'ngMaterial', 'orders.routes'])
	.config(function($authProvider) {
		'use strict';
		$authProvider.github({
			clientId: '3532eda80a0f3b9f16a1',
			authorizationEndpoint: 'https://github.com/login/oauth/authorize',
			redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
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
			redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
			authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
		});

		$authProvider.baseUrl = 'http://localhost:3000';
		$authProvider.withCredentials = false;
	});