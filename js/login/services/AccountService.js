/*global angular */

angular
	.module('orders')
	.factory('AccountModel', ['$http', AccountModel])
	.factory('AccountService', ['AccountModel', AccountService]);

function AccountModel($http) {
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

function AccountService(AccountModel) {
	'use strict';

	return {
		getUserData: function () {
			return AccountModel.getProfile()
				.then(function(response) {
					return response.data;
				})
				.catch(function(response) {});
		}
	};
};
