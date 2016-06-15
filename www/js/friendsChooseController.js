evote.controller('FriendsChooseCtrl', function($scope,loginservices,$http, $cordovaContacts,$ionicLoading,$ionicPopup, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ,$ionicModal) {
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

    $scope.user = [];

    $scope.done = function(){
      var alertPopup = $ionicPopup.alert({
           title: 'DONE!',
           template: $scope.user.UsersList.length
          });
      console.log($scope.user.UsersList);    
    };
    // get users from the server
    $http.get( loginservices.getlink() + "getUsers")
            .success(function(data) {
                $scope.UsersList = data;
                console.log($scope.UsersList);
            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });
            });

});
