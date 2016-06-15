evote.controller('FriendsChooseCtrl', function($scope,loginservices,$rootScope,$state, $http, $cordovaContacts,$ionicLoading,$ionicPopup, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ,$ionicModal) {
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

    $scope.grpID = Number($rootScope.GrpID);
    $scope.user = [];
    console.log($scope.grpID);




    $scope.done = function(){
        var alertPopup = $ionicPopup.alert({
             title: 'DONE!',
             template: $scope.user.UsersList.length
            });
        console.log($scope.user.UsersList);
        // posting will be done from here

        var memList = [];

        for(var j=0; j<$scope.user.UsersList.length;j++){
          var newlist = {group_ID:$scope.grpID, user_ID:$scope.user.UsersList[j].id};

          var newObject = JSON.parse(JSON.stringify(newlist));
          memList.push(newObject);
        }

        console.log(memList);

        $http.post( loginservices.getlink() + "addUsersToGroup", memList)
            .then(function successCallback(response) {
                console.log(response);
                // set poll id from here

                // created by post adding from here!
                var alertPopup = $ionicPopup.alert({
                     title: 'Success!',
                     template: 'members were added was created!'
                    });
                $state.go('app.friendsChoose');


                // add the poll created by in here
            },
            function errorCallback(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });
            });
    };


    // get users from the server
    $http.get( loginservices.getlink() + "getUsersNinGroup/" + $scope.grpID )
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
