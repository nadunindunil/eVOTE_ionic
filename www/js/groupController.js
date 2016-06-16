evote.controller('GroupCtrl', function($scope,$state, loginservices, $http,$ionicLoading, $timeout, $rootScope, $stateParams, ionicMaterialInk, ionicMaterialMotion,$ionicModal) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    // $scope.isExpanded = true;
    // $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });


    $scope.grp = $stateParams.groupId;

    loginservices.setGrpID($stateParams.groupId);
    $rootScope.GrpID = $stateParams.groupId;

    //$scope.PollsList = {};

    $scope.delete = function(id) {
      $http.get(loginservices.getlink() + "removePoll/"+ id)
              .success(function(data) {

                var alertPopup = $ionicPopup.alert({
                     title: 'Delete success!',
                     template: 'Poll was deleted!'
                    });

                  $state.go('app.profile');
              })
              .error(function(data) {
                  var alertPopup = $ionicPopup.alert({
                       title: 'SOMETHING WENT WRONG!',
                       template: 'please check your internet connection!'
                      });


              });
    };

    $ionicLoading.show();
    $http.get(loginservices.getlink() + "getGroupPolls/"+ $stateParams.groupId)
            .success(function(data) {

                $scope.PollsList = data;
                console.log($scope.PollsList);
                $ionicLoading.hide();


            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });
                    $ionicLoading.hide();

            });


    $scope.createPoll = function() {
      //

    };
});
