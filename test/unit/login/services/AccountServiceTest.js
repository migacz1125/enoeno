/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('orders'));

	describe('AccountService Tests', function () {
		var sut,
			scope,
			accountModel,
			q,
			exampleUser = {_id:1, email:null, displayName:'Bartosz Gerono', picture:'', github:6169713};

		beforeEach(
			inject(function (AccountService, $rootScope, AccountModel, $q) {
				scope = $rootScope.$new();
				sut = AccountService;
				accountModel = AccountModel;
				q = $q;
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
