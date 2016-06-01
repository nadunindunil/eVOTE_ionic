evote.controller('ProfileCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.usrname = $rootScope.name;

    // Set Ink
    ionicMaterialInk.displayEffect();
});
