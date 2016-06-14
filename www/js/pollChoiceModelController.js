evote.controller('PollChoiceModalCtrl', function($scope,loginservices,$state,$http,$rootScope,$timeout,$ionicPopup,$stateParams,$ionicModal,ionicMaterialMotion, ionicMaterialInk) {

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
    $state.go('app.groups');
  };

  $scope.choices = [{text:"",id:0},{text:"",id:1}];

  $scope.addChoice = function(){
    $scope.choices.push({text:"",id:$scope.choices.length});
  };

  $scope.addChoices = function() {
    
  };

});
