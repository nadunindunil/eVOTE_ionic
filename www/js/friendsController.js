evote.controller('FriendsCtrl', function($scope,loginservices, $cordovaContacts,$ionicLoading,$ionicPopup, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion ,$ionicModal) {
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

    $scope.user = [];

    $scope.done = function(){
      var alertPopup = $ionicPopup.alert({
           title: 'DONE!',
           template: $scope.user.phoneContacts[0].phoneNumbers[0].value
          });
    };
    // get users from the server
    // $http.get( loginservices.getlink() + "getUsers")
    //         .success(function(data) {
    //             $scope.UsersList = data;
    //             console.log($scope.UsersList);
    //         })
    //         .error(function(data) {
    //             var alertPopup = $ionicPopup.alert({
    //                  title: 'SOMETHING WENT WRONG!',
    //                  template: 'please check your internet connection!'
    //                 });
    //         });


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
