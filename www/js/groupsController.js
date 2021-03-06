evote.controller('GroupsCtrl',function($scope,$ionicLoading,loginservices,$state,$http,$rootScope,$stateParams,$ionicPopup,$ionicModal,$timeout,ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    // $scope.isExpanded = true;
    // $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    ionicMaterialMotion.fadeSlideInRight();

    //$scope.GroupsList = {};

    $scope.delete = function(id) {
      $http.get(loginservices.getlink() + "removeGroup/"+ id)
              .success(function(data) {

                  $state.go('app.profile');
                  var alertPopup = $ionicPopup.alert({
                       title: 'Delete success!',
                       template: 'Group was deleted!'
                      });
              })
              .error(function(data) {
                  var alertPopup = $ionicPopup.alert({
                       title: 'SOMETHING WENT WRONG!',
                       template: 'please check your internet connection!'
                      });


              });
    };

    $scope.init = function(){
      $ionicLoading.show();
      console.log("inside init");


      $http.get( loginservices.getlink() +"getUserGroups/"+ $rootScope.id)
              .success(function(data) {
                  $scope.GroupsList = data;
                  console.log("group list");
                  $ionicLoading.hide();
              })
              .error(function(data) {
                  var alertPopup = $ionicPopup.alert({
                       title: 'SOMETHING WENT WRONG!',
                       template: 'please check your internet connection!'
                      });

                  $ionicLoading.hide();

              });
             
    };

    $scope.init();






});
