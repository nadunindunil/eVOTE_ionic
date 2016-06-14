evote.controller('GroupsCtrl',function($scope,loginservices,$state,$http,$rootScope,$stateParams,$ionicPopup,$ionicModal,$timeout,ionicMaterialInk, ionicMaterialMotion) {
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

    function init(){
      console.log("inside init");

      $http.get( loginservices.getlink() +"getUserGroups/"+ $rootScope.id)
              .success(function(data) {
                  $scope.GroupsList = data;
                  console.log("group list");
              })
              .error(function(data) {
                  var alertPopup = $ionicPopup.alert({
                       title: 'SOMETHING WENT WRONG!',
                       template: 'please check your internet connection!'
                      });

              });
    };

    init();




});
