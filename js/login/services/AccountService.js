/*global angular */

angular
	.module('orders')
	.factory('AccountService', ['$http', AccountService]);

function AccountService($http) {
	'use strict';

	return {
		getProfile: function() {
			return $http.get('http://localhost:3000/api/me');
		},
		updateProfile: function(profileData) {
			return $http.put('/api/me', profileData);
		}
	};
};