evote.controller('GroupModalCtrl', function($scope,$http,$rootScope,$timeout,$ionicPopup,$stateParams,$ionicModal) {


  $timeout(function () {
      document.getElementById('fab-groups').classList.toggle('on');
  }, 50);

  $ionicModal.fromTemplateUrl('templates/groups-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
  });

  $scope.closeModal = function() {
      $scope.modal.hide();
  };

  $scope.show_groupsModel = function() {
      $scope.modal.show();
      console.log("inside the show model")

  };



  $scope.group = {};

  $scope.createGroup = function(){
    $http.post("http://localhost:8000/api/addGroup", $scope.group)
        .then(function successCallback(response) {
            console.log(response);
            if (response.status == 201){
              var alertPopup = $ionicPopup.alert({
                   title: 'Success!',
                   template: 'Group was created!'
                  });

                  $scope.group = {};
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
  // Cleanup the modal when we're done with it
  $scope.$on('$destroy', function() {
      $scope.modal.remove();
  });

});
