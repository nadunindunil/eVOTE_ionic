evote.controller('GroupMembersCtrl', function($scope,$rootScope,loginservices,$http,loginservices, $cordovaContacts,$ionicLoading,$ionicPopup, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ,$ionicModal) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    // $timeout(function() {
    //     $scope.isExpanded = true;
    //     $scope.$parent.setExpanded(true);
    // }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
    $scope.GrpID = $rootScope.GrpID;
    //get users from the server

    $http.get( loginservices.getlink() + "getGroupUsers/" + $scope.GrpID )
            .success(function(data) {
                $scope.GrpMembers = data;
                console.log($scope.GrpMembers);
            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });
            });


});
