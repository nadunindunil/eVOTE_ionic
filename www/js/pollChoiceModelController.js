evote.controller('PollChoiceModalCtrl', function($scope,$ionicHistory,loginservices,$state,$http,$rootScope,$timeout,$ionicPopup,$stateParams,$ionicModal,ionicMaterialMotion, ionicMaterialInk) {

  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);
  $rootScope.pollID = $scope.pollID;



  $scope.usrname = $rootScope.name;

  // Set Ink
  ionicMaterialInk.displayEffect();

  $scope.pllID = $rootScope.pollID;

  $scope.closeModel = function() {
    $state.go('app.groups');
  };

  $scope.choices = [{poll_ID:$scope.pllID,choice:"",id:0},{poll_ID:$scope.pllID,choice:"",id:1}];

  $scope.addChoice = function(){
    $scope.choices.push({poll_ID:$scope.pllID,choice:"",id:$scope.choices.length});
  };



  //////////////////////////////////////////////////////////////////////////



  $scope.addChoices = function() {
    var choiceList = [];

      //adding data to the choiceList array
      for (var i = 0; i < $scope.choices.length; i++ ){
        console.log($scope.choices[i].poll_ID);
        console.log($scope.choices[i].choice);
        var aChoice = {poll_ID:$scope.choices[i].poll_ID,choice:$scope.choices[i].choice};
        console.log(aChoice);
        var newObject = JSON.parse(JSON.stringify(aChoice));
        choiceList.push(newObject);
      }

      $http.post( loginservices.getlink() + "addPollChoices", choiceList)
          .then(function successCallback(response) {
              console.log(response);
              console.log(response.data);
              // set poll id from here

              var alertPopup = $ionicPopup.alert({
                   title: 'Success!',
                   template: 'poll choices were created!'
                  });
              $state.go('app.profile');
              // add the poll created by in here
          },
          function errorCallback(data) {
              var alertPopup = $ionicPopup.alert({
                   title: 'SOMETHING WENT WRONG!',
                   template: 'please check your internet connection!'
                  });
          });


    console.log(choiceList);
  };

});
