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

    $scope.closeModel = function() {
        $ionicHistory.goBack();
    };

    $scope.spoll={};
    $scope.poll = {};
    $scope.poll.createdby = $rootScope.id;
    $scope.poll.group = loginservices.getGrpID();
    console.log(loginservices.getGrpID());
    $scope.poll.group = $rootScope.GrpID;

    $scope.addPoll = function(){

      //adding poll starting from here

      $http.post( loginservices.getlink() +"addPoll", $scope.poll)
          .then(function successCallback(response) {
              console.log(response);
              console.log($scope.poll);
              // add the poll in here

              if (response.status == 201){
                    // need to fix the reload issue


                    $http.post( loginservices.getlink() + "addUserPollGroup", $scope.poll)
                        .then(function successCallback(response) {
                            console.log(response);
                            console.log(response.data);
                            console.log(response.data.poll);
                            console.log(response.data.poll.id);
                            // set poll id from here
                            $rootScope.pollID = response.data.poll.id;
                            // created by post adding from here!
                            var alertPopup = $ionicPopup.alert({
                                 title: 'Success!',
                                 template: 'Poll was created!'
                                });
                            $state.go('app.choicemdl');
                            // add the poll created by in here
                        },
                        function errorCallback(data) {
                            var alertPopup = $ionicPopup.alert({
                                 title: 'SOMETHING WENT WRONG!',
                                 template: 'please check your internet connection!'
                                });
                        });

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
