evote.controller('PollModalCtrl', function($scope,$state,$http,$rootScope,$ionicPopup,$timeout,$ionicPopup,$stateParams,$ionicModal) {
    $scope.poll = {};

    $scope.createGroup = function(){
      $http.post("http://localhost:8000/api/addPoll", $scope.poll)
          .then(function successCallback(response) {
              console.log(response);
              if (response.status == 201){
                var alertPopup = $ionicPopup.alert({
                     title: 'Success!',
                     template: 'Group was created!'
                    });

                    $scope.poll = {};
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

  $scope.closeModal = function() {
      $state.go('app.group');
  };

});
