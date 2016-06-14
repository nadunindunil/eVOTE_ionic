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

    $scope.closeModal = function() {
        $ionicHistory.goBack();
    };


    $scope.poll = {};

    $scope.addPoll = function(){
      $http.post( loginservices.getlink() +"addPoll", $scope.poll)
          .then(function successCallback(response) {
              console.log(response);
              console.log($scope.poll);
              // add the poll in here

              if (response.status == 201){
                    // need to fix the reload issue

                    $http.post( loginservices.getlink() + "addUserPoll", $scope.poll)
                        .then(function successCallback(response) {
                            console.log(response);
                            console.log($scope.poll);
                            // add the poll created by in here
                        },
                        function errorCallback(data) {
                            var alertPopup = $ionicPopup.alert({
                                 title: 'SOMETHING WENT WRONG!',
                                 template: 'please check your internet connection!'
                                });
                        });
                        var alertPopup = $ionicPopup.alert({
                             title: 'Success!',
                             template: 'Poll was created!'
                            });
                            // created by post adding from here!

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

});
