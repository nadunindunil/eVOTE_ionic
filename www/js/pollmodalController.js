evote.controller('PollModalCtrl', function($scope,loginservices,$ionicHistory,$state,$http,$rootScope,$ionicPopup,$timeout,$ionicPopup,ionicMaterialInk,$stateParams,$ionicModal) {
  // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.usrname = $rootScope.name;

    // Set Ink
    ionicMaterialInk.displayEffect();



    $scope.poll = {};

    $scope.createGroup = function(){
      $http.post( loginservices.getlink() + "addPoll", $scope.poll)
          .then(function successCallback(response) {
              console.log(response);
              if (response.status == 201){
                var alertPopup = $ionicPopup.alert({
                     title: 'Success!',
                     template: 'Group was created!'
                    });

                    $scope.poll = {};
                    $scope.closeModal();


              }

          },
          function errorCallback(data) {
              var alertPopup = $ionicPopup.alert({
                   title: 'SOMETHING WENT WRONG!',
                   template: 'please check your internet connection!'
                  });

          });
    };

  $scope.closeModal = function() {
      $ionicHistory.goBack();
  };

});
