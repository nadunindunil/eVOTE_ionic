'use strict'

evote.controller('LoginCtrl', function($scope,loginservices,$http,$state,$ionicPopup,$timeout, $rootScope,$stateParams, ionicMaterialInk) {
    $scope.user = {};

    $scope.t = true;

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.authenticate = function(){
        console.log($scope.user);
        $http.post( loginservices.getlink() +"authenticate", $scope.user)
            .success(function(data) {
                console.log(data);
                if (data == "not found"){

                    var alertPopup = $ionicPopup.alert({
                     title: 'Incorrect Credentials',
                     template: 'please check your user name and password again!'
                    });
                }
                else{

                    $state.go('app.profile');
                    //alert(data[0].name);
                    $rootScope.name = data.name;
                    $rootScope.id = data.id;
                    $scope.id = data.id;

                    console.log($rootScope.id);

                }

            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'check your internet connection!'
                    });

            });

    };
});
