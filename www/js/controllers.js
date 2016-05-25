

evote.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
});

evote.controller('LoginCtrl', function($scope,$http,$state,$ionicPopup,$timeout, $rootScope,$stateParams, ionicMaterialInk) {
    $scope.user = {};

    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.authenticate = function(){
        console.log($scope.user);
        $http.post("http://localhost:8000/api/authenticate", $scope.user)
            .success(function(data) {
                console.log(data);
                if (data == "not found"){
                    
                    var alertPopup = $ionicPopup.alert({
                     title: 'Incorrect Credentials',
                     template: 'please check your user name and password again!'
                    });
                }
                else{

                    $state.go('app.profile');
                    //alert(data[0].name);
                    $rootScope.name = data.name;
                    $rootScope.id = data.id;

                    console.log($rootScope.id);


                    
                }
                
            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });
                
            });

    };
});

evote.controller('RegisterCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
});


evote.controller('GroupCtrl', function($scope, $http, $timeout, $stateParams, ionicMaterialInk, ionicMaterialMotion,$ionicModal) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
    

    $scope.grp = $stateParams.groupId;

    $scope.PollsList = {};


    $http.get("http://localhost:8000/api/getGroupPolls/"+ $stateParams.groupId)
            .success(function(data) {

                $scope.PollsList = data;
                console.log($scope.PollsList);
                
                
            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });
                
            });

  //   $ionicModal.fromTemplateUrl('templates/groups-modal.html', {
  //       scope: $scope,
  //       animation: 'slide-in-up'
  //   }).then(function(modal) {
  //       $scope.modal = modal;
  //   });

  //   $scope.openModal = function() {
  //       $scope.modal.show();

  //   };

  //   $scope.closeModal = function() {
  //   $scope.modal.hide();
  // };
  //   // Cleanup the modal when we're done with it
  //   $scope.$on('$destroy', function() {
  //       $scope.modal.remove();
  //   });


});

evote.controller('PollCtrl', function($scope, $http, $rootScope , $timeout, $ionicPopup, $stateParams, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
    

    $scope.pll = $stateParams.pollId;
    $scope.PollInfo = {};
    $scope.PollChoices = {};
    $scope.currentTask = 0;  // given answer
    $scope.judge = "";

    var isChoiceMade = function () {

        if ($scope.currentTask>0){
            $scope.judge = "you have given the vote";

        }
        else if($scope.currentTask == 0){
            console.log("in else");
            $scope.judge = "You haven't given your vote for the poll";
        }
    };



    $http.get("http://localhost:8000/api/getPollInfo/"+ $stateParams.pollId)
            .success(function(data) {

                $scope.PollInfo = data;
                console.log($scope.PollInfo);
                
                
            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });
                
            });

    $http.get("http://localhost:8000/api/getPollChoices/"+ $stateParams.pollId)
        .success(function(data) {

            $scope.PollChoices = data;
            console.log($scope.PollChoices);


        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'SOMETHING WENT WRONG!',
                template: 'please check your internet connection!'
            });

        });

    // will return users answer which was given to this poll

    $http.get("http://localhost:8000/api/getUserVote/"+ $rootScope.id +"/poll/"+ $stateParams.pollId)
        .success(function(data) {

            if (data[0] != null){
                $scope.currentTask = data[0].choice_ID;
                console.log($scope.currentTask);

            }

            isChoiceMade();


        })
        .error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'SOMETHING WENT WRONG!',
                template: 'please check your internet connection!'
            });



        });

    // search for the vote user given







});

evote.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
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
});

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

evote.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

evote.controller('GroupsCtrl', function($scope, $http, $rootScope, $stateParams, $ionicModal , $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    $scope.GroupsList = {};


    $http.get("http://localhost:8000/api/getUserGroups/"+ $rootScope.id)
            .success(function(data) {

                $scope.GroupsList = data;
                console.log($scope.GroupsList);
                
                
            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                    });
                
            });

      


    

});