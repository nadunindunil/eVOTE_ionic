evote.controller('GroupModalCtrl', function($scope,loginservices,$state,$http,$rootScope,$timeout,$ionicPopup,$stateParams,$ionicModal,ionicMaterialMotion, ionicMaterialInk) {

  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);



  $scope.usrname = $rootScope.name;

  // Set Ink
  ionicMaterialInk.displayEffect();


          $scope.closeModal = function() {
              $state.go('app.groups');;
          };


          $scope.group = {};
          $scope.group.createdby = $rootScope.id;

          $scope.createGroup = function(){
            $http.post( loginservices.getlink() +"addGroup", $scope.group)
                .then(function successCallback(response) {
                    console.log(response);
                    console.log($scope.group);
                    // add the group in here

                    if (response.status == 201){
                          // need to fix the reload issue

                          $http.post( loginservices.getlink() + "addUserGroup", $scope.group)
                              .then(function successCallback(response) {
                                  console.log(response);
                                  console.log($scope.group);
                                  // add the group created by in here
                              },
                              function errorCallback(data) {
                                  var alertPopup = $ionicPopup.alert({
                                       title: 'SOMETHING WENT WRONG!',
                                       template: 'please check your internet connection!'
                                      });
                              });


                              var alertPopup = $ionicPopup.alert({
                                   title: 'Success!',
                                   template: 'Group was created!'
                                  });
                                  // created by post adding from here!

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



});
