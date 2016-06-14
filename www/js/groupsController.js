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

    $scope.GroupsList = {};
    init();

    function init(){
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






});
