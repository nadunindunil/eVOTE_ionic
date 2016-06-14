evote.controller('GroupCtrl', function($scope, loginservices, $http,$ionicLoading, $timeout, $rootScope, $stateParams, ionicMaterialInk, ionicMaterialMotion,$ionicModal) {
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

    $scope.PollsList = {};


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

      
    };
});
