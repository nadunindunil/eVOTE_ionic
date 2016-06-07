evote.controller('PollCtrl', function($scope, $http, $rootScope , $timeout, $ionicPopup, $stateParams, ionicMaterialInk, ionicMaterialMotion) {
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
