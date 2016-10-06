/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('LoginController Tests', function () {
		var scope, ctrl, location, auth, q;

		beforeEach(
			inject(function ($rootScope, $controller, $location, $auth, $q) {
				scope = $rootScope.$new();
				location = $location;
				auth = $auth;
				q = $q;

				ctrl = $controller('LoginController', {
					$scope: scope,
					$location: $location,
					$auth: $auth
				});
			}
		));

		it('login: Should if login success go to home screen', function () {
			spyOn(auth, 'login').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve();
				return deferred.promise;
			});

			spyOn(location, 'path');

			ctrl.login();
			scope.$digest();

			expect(auth.login).toHaveBeenCalled();
			expect(location.path).toHaveBeenCalledWith('');
		});

		it('authenticate: Should if auth success go to home screen', function () {
			spyOn(auth, 'authenticate').and.callFake(function () {
				var deferred = q.defer();
				deferred.resolve();
				return deferred.promise;
			});

			spyOn(location, 'path');

			ctrl.authenticate('github');
			scope.$digest();

			expect(auth.authenticate).toHaveBeenCalledWith('github');
			expect(location.path).toHaveBeenCalledWith('');
		});

		it('authenticate: Should if auth failed go to logout path', function () {
			spyOn(auth, 'authenticate').and.callFake(function () {
				var deferred = q.defer();
				deferred.reject();
				return deferred.promise;
			});

			spyOn(location, 'path');

			ctrl.authenticate('github');
			scope.$digest();

			expect(auth.authenticate).toHaveBeenCalledWith('github');
			expect(location.path).toHaveBeenCalledWith('/logout');
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
