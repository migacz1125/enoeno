/*global angular */

/**
 * Controller to order list and order service connection.
 */
angular
	.module('orders')
	.controller('LoginController', [
		'$scope',
		'$location',
		'$auth',
		LoginCtrl
	]);

function LoginCtrl($scope, $location, $auth) {
	'use strict';

	console.log('------ LoginCtrl');

	var vm = this;

	$scope.login = function() {
		$auth.login($scope.user)
			.then(function() {
				//toastr.success('You have successfully signed in!');
				console.log('----- login success !!!');
				$location.path('/');
			})
			.catch(function(error) {
				//toastr.error(error.data.message, error.status);
				console.log('----- login error: ', error);
			});
	};

	$scope.authenticate = function(provider) {
		console.log('------ loginCtrl:authenticate');
		console.log('------ loginCtrl:authenticate:provider: ', provider);

		$auth.authenticate(provider)
			.then(function() {
				console.log('----- authenticate success !');
				$location.path('/');
			})
			.catch(function(error) {
				console.log('----- authenticate error: ', error);
			});
	};

	/**
	 * Listener to all changes om orders.
	 */
	/*$scope.$watch('OrderListCtrl.orders', function () {
		vm.remainingCount = OrderService.getNumOfActive();
		vm.completedCount = OrderService.getNumOfCompleted();
		vm.isAllCompleted = OrderService.isAllOrderCompleted();
	}, true);*/

	/**
	 * Monitor the current route for changes and adjust the filter accordingly.
	 */
	/*$scope.$on('$routeChangeSuccess', function () {
		vm.status = $routeParams.status || '';
		vm.statusFilter = (vm.status === TAP_ACTIVE) ?
			{ completed: false } : (vm.status === TAP_COMPLETED) ?
			{ completed: true } : {};
	});*/

	/**
	 * Clean up memory after destroy component.
	 */
	$scope.$on('$destroy', function(){
		vm = null;
		$scope = null;
	});
}
