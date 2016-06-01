evote.controller('PollModalCtrl', function($scope,$http,$rootScope,$timeout,$ionicPopup,$stateParams,$ionicModal) {
  $timeout(function () {
      document.getElementById('fab-group').classList.toggle('on');
  }, 50);

  $ionicModal.fromTemplateUrl('templates/polls_modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
  });

  $scope.show_pollsModel = function() {
      $scope.modal.show();
      console.log("inside the show model")

  };

  $scope.closeModal = function() {
      $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it
  $scope.$on('$destroy', function() {
      $scope.modal.remove();
  });

});
