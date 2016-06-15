evote.controller('PollCtrl', function($scope,$ionicHistory,loginservices, $http, $rootScope , $timeout, $ionicPopup, $stateParams, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    $scope.closePoll = function(){
      $ionicHistory.goBack();

    };

    $scope.pll = $stateParams.pollId;
    $scope.PollInfo = {};
    $scope.PollChoices = {};
    $scope.currentTask = 0;  // given answer
    $scope.judge = "";
    $scope.myVote = {};
    $scope.myVote.user_ID = $rootScope.id;
    $scope.myVote.poll_ID = $scope.pll;

    $scope.labels = [];
    $scope.data = [];
    $scope.shouldShowDelete = false;
     $scope.shouldShowReorder = false;
     $scope.listCanSwipe = true

    $http.get( loginservices.getlink() + "getVoteSummary/"+ $stateParams.pollId)
            .success(function(data) {

                $scope.votes = data;
                console.log($scope.votes);

                for(var k = 0; k<$scope.votes.length ; k++){
                  $scope.labels.push($scope.votes[k].choice);
                  $scope.data.push($scope.votes[k].amount);

                }
                console.log($scope.labels);
                console.log($scope.data);

            })
            .error(function(data) {
                var alertPopup = $ionicPopup.alert({
                     title: 'SOMETHING WENT WRONG!',
                     template: 'please check your internet connection!'
                   });
            });




    $scope.setVote = function(value){
      $scope.myVote.choice_ID = value;
      console.log($scope.myVote.choice_ID);
    };

    var isChoiceMade = function () {

        if ($scope.currentTask>0){
            $scope.judge = "you have given the vote";
            document.getElementById("doneButton").disabled=true;

        }
        else if($scope.currentTask == 0){
            console.log("in else");
            $scope.judge = "You haven't given your vote for the poll";
            $scope.myVote.choice_ID = $scope.currentTask;
            document.getElementById("doneButton").disabled=false;

        }
    };

    $scope.addVote = function(){

      $http.post( loginservices.getlink() + "addVote", $scope.myVote )
          .then(function successCallback(response) {
              console.log(response);
              console.log(response.data);
              // set poll id from here

              var alertPopup = $ionicPopup.alert({
                   title: 'Success!',
                   template: 'Vote Success!'
                  });
              document.getElementById("doneButton").disabled=true;

              // add the poll created by in here
          },
          function errorCallback(data) {
              var alertPopup = $ionicPopup.alert({
                   title: 'SOMETHING WENT WRONG!',
                   template: 'please check your internet connection!'
                  });
          });

    };


    $http.get( loginservices.getlink() + "getPollInfo/"+ $stateParams.pollId)
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



    $http.get( loginservices.getlink() + "getPollChoices/"+ $stateParams.pollId)
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

    $http.get( loginservices.getlink() + "getUserVote/"+ $rootScope.id +"/poll/"+ $stateParams.pollId)
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
