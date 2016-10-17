/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('AccountService Tests', function () {
		var sut,
			scope,
			accountModel,
			q,
			auth,
			location,
			exampleUser = {_id:1, email:null, displayName:'Bartosz Gerono', picture:'', github:6169713};

		beforeEach(
			inject(function (AccountService, $rootScope, AccountModel, $q, $auth, $location) {
				scope = $rootScope.$new();
				sut = AccountService;
				accountModel = AccountModel;
				q = $q;
				auth = $auth;
				location = $location;
			}
		));

		it('getUserData: should return user data', function () {
			spyOn(accountModel, 'getProfile').and.callFake(function () {
				var response = {data: exampleUser};
				var deferred = q.defer();
				deferred.resolve(response);
				return deferred.promise;
			});

			sut.loadUserData();
			scope.$digest();

			expect(accountModel.getProfile.calls.count()).toEqual(1);
			expect(sut.getUserData()).toEqual(exampleUser);
		});

		it('getUserData: should return user data if user is loaded before', function () {
			spyOn(accountModel, 'getProfile').and.callFake(function () {
				var response = {data: exampleUser};
				var deferred = q.defer();
				deferred.resolve(response);
				return deferred.promise;
			});

			sut.loadUserData();
			scope.$digest();

			sut.loadUserData();

			expect(accountModel.getProfile.calls.count()).toEqual(1);
			expect(sut.getUserData()).toEqual(exampleUser);
		});

		it('loginRequired: should promise resolved is user is authenticated', function () {
			var stubPromise = {resolve: jasmine.createSpy(), reject: jasmine.createSpy()};

			spyOn(auth, 'isAuthenticated').and.returnValue(true);
			spyOn(q, 'defer').and.returnValue(stubPromise);

			sut.loginRequired();

			expect(auth.isAuthenticated).toHaveBeenCalled();
			expect(q.defer).toHaveBeenCalled();
			expect(stubPromise.resolve).toHaveBeenCalled();
		});

		it('loginRequired: Should go to home location if  user authenticated is false.', function () {
			spyOn(auth, 'isAuthenticated').and.returnValue(false);
			spyOn(location, 'path');

			sut.loginRequired();

			expect(auth.isAuthenticated).toHaveBeenCalled();
			expect(location.path).toHaveBeenCalledWith('/login');
		});

		it('skipIfLoggedIn: should promise reject is user is authenticated', function () {
			var stubPromise = {resolve: jasmine.createSpy(), reject: jasmine.createSpy()};

			spyOn(auth, 'isAuthenticated').and.returnValue(true);
			spyOn(q, 'defer').and.returnValue(stubPromise);

			sut.skipIfLoggedIn();

			expect(auth.isAuthenticated).toHaveBeenCalled();
			expect(q.defer).toHaveBeenCalled();
			expect(stubPromise.reject).toHaveBeenCalled();
		});

		it('skipIfLoggedIn: should promise reject is user is authenticated', function () {
			var stubPromise = {resolve: jasmine.createSpy(), reject: jasmine.createSpy()};

			spyOn(auth, 'isAuthenticated').and.returnValue(false);
			spyOn(q, 'defer').and.returnValue(stubPromise);

			sut.skipIfLoggedIn();

			expect(auth.isAuthenticated).toHaveBeenCalled();
			expect(q.defer).toHaveBeenCalled();
			expect(stubPromise.resolve).toHaveBeenCalled();
		});

		afterEach(function() {
			scope.$destroy();
		});
	});

	describe('AccountModel Tests', function () {
		var sut,
			scope,
			httpBackend,
			exampleUser = {_id:1, email:null, displayName:'Bartosz Gerono', picture:'', github:6169713};

		beforeEach(function () {
			inject(function (AccountModel, $rootScope, $httpBackend) {
					scope = $rootScope.$new();
					sut = AccountModel;
					httpBackend = $httpBackend;
				}
			);

			httpBackend.whenGET(/js\/templates\//).respond('');
			httpBackend.whenGET(/api\/me/).respond('');
		});

		it('getProfile: should return user data', function () {
			var userData = {data: exampleUser, status: 200, config: {}, statusText: 'OK'};
			httpBackend.expectGET(/api\/me/).respond(userData);

			sut.getProfile();

			httpBackend.flush();
		});

		it('updateProfile: should update user', function () {
			var userData = {data: exampleUser, status: 200, config: {}, statusText: 'OK'};

			httpBackend.expect('PUT', /api\/me/).respond(userData);
			sut.updateProfile();

			httpBackend.flush();
		});

		afterEach(function() {
			scope.$destroy();
		});
	});
}());
