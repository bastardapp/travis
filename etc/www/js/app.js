angular.module('luck', ['ionic', 'ionic.cloud', 'app.controllers', 'ngCordova'])

    .run(function ($ionicPlatform, $state, $http, $rootScope) {
        $ionicPlatform.ready(function () {
            alert('run start')
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.disableScroll(true);
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            alert('run end')
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicCloudProvider) {

        $stateProvider
            .state('index', {
                templateUrl: 'templates/index.html', url: '/index'
            });

        $ionicCloudProvider.init({
            "core": {
                "app_id": "e8ddc199"
            },
            "push": {
                "sender_id": "602909636531",
                "pluginConfig": {
                    "ios": {
                        "badge": true, "sound": true
                    },
                    "android": {
                        "iconColor": "#343434"
                    }
                }
            }
        });

        $urlRouterProvider.otherwise('/index');
    });
