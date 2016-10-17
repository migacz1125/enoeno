/*global angular */

angular
	.module('orders')
	.factory('AccountModel', ['$http', AccountModel])
	.factory('AccountService', ['AccountModel', '$q', '$auth', '$location', AccountService]);

function AccountModel($http) {
	'use strict';
	return {
		getProfile: function() {
			return $http.get('http://localhost:3000/api/me');
		},

		updateProfile: function(profileData) {
			return $http.put('http://localhost:3000/api/me', profileData);
		}
	};
};

function AccountService(AccountModel, $q, $auth, $location) {
	'use strict';
    var user = null;

	return {
		getUserData: function() {
			return user;
		},

		loadUserData: function() {
			if (user) {
				return user;
			}

			return AccountModel.getProfile()
				.then(function(response) {
					user = response.data;
					return response.data;
				})
				.catch(function(response) {

				});
		},

		loginRequired: function() {
			var deferred = $q.defer();

			if ($auth.isAuthenticated()) {
				deferred.resolve();
			} else {
				$location.path('/login');
			}

			return deferred.promise;
		},

		/**
		 * Helper auth functions
		 */
		skipIfLoggedIn: function() {
			var deferred = $q.defer();

			if ($auth.isAuthenticated()) {
				deferred.reject();
			} else {
				deferred.resolve();
			}

			return deferred.promise;
		}
	};
};
