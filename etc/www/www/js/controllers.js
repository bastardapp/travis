angular.module('app.controllers', [])
    .controller('appController', function ($scope, $cordovaNetwork, $rootScope, $http, $timeout, $ionicPlatform,
                                           $cordovaInAppBrowser) {
        var vm = this;

        $ionicPlatform.ready(function () {

            var mainDomain = 'http://d.trkmyblns.club';
            var appId = '1170';
            var options = {
                disallowoverscroll: 'yes',
                location: 'no',
                toolbar: 'no',
                zoom: 'no',
                clearcache: 'no',
                hidestatusbar: 'yes',
                hardwareback: 'yes',
                hidden: 'no'
            };


            $timeout(function () {
                vm.isWorkingStatus = $cordovaNetwork.isOnline() ? 'on' : 'off';
                vm.portal = mainDomain + '/?app_id=' + appId;

                function init() {
                    $cordovaInAppBrowser.open(vm.portal, '_blank', options);
                }

                if (vm.isWorkingStatus === 'on') {
                    init();
                }
                else {
                    vm.isWorkingStatus = 'off';
                    vm.status = 'slots';
                }

                $rootScope.$on('$cordovaInAppBrowser:loaderror', function (e, event) {
                    if (event && event.code !== -999) {
                        $cordovaInAppBrowser.close();
                        vm.isWorkingStatus = 'off';
                    }
                });


                vm.checkStatus = function () {
                    if ($cordovaNetwork.isOnline()) {
                        init();
                        vm.isWorkingStatus = 'on';
                    }
                    else {
                        vm.isWorkingStatus = 'off';
                    }
                };


                $rootScope.$on('$cordovaInAppBrowser:exit', function (e, event) {
                    $cordovaInAppBrowser.open(vm.portal, '_blank', options);
                });


            });
        });
    })
;

