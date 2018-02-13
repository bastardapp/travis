angular.module('luck', ['ionic', 'app.controllers', 'ngCordova'])

    .run(function ($ionicPlatform, $state, $http, $rootScope) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.disableScroll(true);
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('index', {
                templateUrl: 'templates/index.html', url: '/index'
            });

        $urlRouterProvider.otherwise('/index');
    });
