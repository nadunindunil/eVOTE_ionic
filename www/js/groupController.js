evote.controller('GroupCtrl', function($scope, $http, $timeout, $stateParams, ionicMaterialInk, ionicMaterialMotion,$ionicModal) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
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


    $http.get("http://localhost:8000/api/getGroupPolls/"+ $stateParams.groupId)
            .success(function(data) {

                $scope.PollsList = data;
                console.log($scope.PollsList);


            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });

            });
});
