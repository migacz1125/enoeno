/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('LogoutController when authenticated is false', function () {
		var scope, ctrl, location, auth, q;

		beforeEach(
			inject(function ($rootScope, $controller, $location) {
				scope = $rootScope.$new();
				location = $location;
				auth = {
					logout: jasmine.createSpy(),
					isAuthenticated: jasmine.createSpy().and.returnValue(false)
				};

				ctrl = $controller('LogoutController', {
					$scope: scope,
					$location: $location,
					$auth: auth
				});
			}
		));

		it('logout: Should if login success go to home screen', function () {
			expect(auth.isAuthenticated).toHaveBeenCalled();
			expect(auth.logout.calls.any()).toBeFalsy();
		});

		afterEach(function() {
			scope.$destroy();
		});
	});

	describe('LogoutController when authenticated is false', function () {
		var scope, ctrl, location, auth, q;

		beforeEach(
			inject(function ($rootScope, $controller, $location, $auth, $q) {
					scope = $rootScope.$new();
					location = $location;
					auth = {
						logout: jasmine.createSpy().and.callFake(function () {
							var deferred = $q.defer();
							deferred.resolve();
							return deferred.promise;
						}),
						isAuthenticated: jasmine.createSpy().and.returnValue(true)
					};

					ctrl = $controller('LogoutController', {
						$scope: scope,
						$location: $location,
						$auth: auth
					});
				}
			));

		it('logout: Should if login success go to home screen', function () {
			spyOn(location, 'path');

			scope.$digest();

			expect(auth.isAuthenticated).toHaveBeenCalled();
			expect(auth.logout).toHaveBeenCalled();
			expect(location.path).toHaveBeenCalledWith('/login');
		});

		afterEach(function() {
			scope.$destroy();
		});
	});

}());
