evote.controller('FriendsCtrl', function($scope,$cordovaContacts,$ionicLoading, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    // $timeout(function() {
    //     $scope.isExpanded = true;
    //     $scope.$parent.setExpanded(true);
    // }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();

    // taking contacts
    $scope.getContacts = function() {
      console.log("inside the contact function");
      $ionicLoading.show({
        template: '<ion-spinner> </ion-spinner>'
      });

    $scope.phoneContacts = [];

    function onSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        $scope.phoneContacts.push(contact);
      }
      $ionicLoading.hide();
    };

    function onError(contactError) {
      alert(contactError);
      $ionicLoading.hide();
    };

    var options = {};
    options.multiple = true;

    $cordovaContacts.find(options).then(onSuccess, onError);

  };

});
