// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var evote = angular.module('starter', ['ionic', 'ionic-material', 'ionMdInput','ngCordova','ngMessages','checklist-model'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-100"><i class="icon ion-paper-airplane energized"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 50);
                }
            }
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            }

        }
    })

    .state('app.friendsChoose', {
        url: '/friendsChoose',
        views: {
            'menuContent': {
                templateUrl: 'templates/friendsChoose.html',
                controller: 'FriendsChooseCtrl'
            }
            ,
            'fabContent': {
                template: '<button id="fab-poll" class="button button-fab button-fab-bottom-right expanded button-calm drop"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-poll').classList.toggle('on');
                    }, 600);

                    document.getElementById('fab-poll').style.display = 'none';
                }
            }


        }
    })

    .state('app.groups', {
        url: '/groups',
        views: {
            'menuContent': {
                templateUrl: 'templates/groups.html',
                controller: 'GroupsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-groups" ui-sref="app.crtgrp" class="button button-fab button-fab-bottom-right expanded button-assertive-100"><i class="icon ion-plus assertive"></i></button>',
                controller: 'GroupsCtrl'
            }
        }
    })

    .state('app.group', {
    url: '/groups/:groupId',
    views: {
      'menuContent': {
        templateUrl: 'templates/group.html',
        controller: 'GroupCtrl'
      },
      'fabContent': {
                template: '<button id="fab-group" ui-sref="app.crtpoll" class="button button-fab button-fab-bottom-right expanded button-assertive-100"><i class="icon ion-plus assertive"></i></button>',
                controller: 'GroupCtrl'
            }
    }


  })

    .state('app.polls', {
        url: '/groups/:grpId/:pollId',
        views: {
            'menuContent': {
                templateUrl: 'templates/poll.html',
                controller: 'PollCtrl'
            }
            ,
            'fabContent': {
                template: '<button id="fab-poll" class="button button-fab button-fab-bottom-right expanded button-calm drop"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-poll').classList.toggle('on');
                    }, 600);

                    document.getElementById('fab-poll').style.display = 'none';
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.crtgrp', {
        url: '/c_group',
        views: {
            'menuContent': {
                templateUrl: 'templates/groups-modal.html',
                controller: 'GroupModalCtrl'
            }
            ,
            'fabContent': {
                template: '<button id="fab-crtgrp" class="button button-fab button-fab-bottom-right expanded button-calm drop"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-crtgrp').classList.toggle('on');
                    }, 50);
                    document.getElementById('fab-crtgrp').style.display = 'none';
                }
            }
        }
    })
    .state('app.crtpoll', {
        url: '/c_poll',
        views: {
            'menuContent': {
                templateUrl: 'templates/polls-modal.html',
                controller: 'PollModalCtrl'
            }
            ,
            'fabContent': {
                template: '<button id="fab-crtgrp" class="button button-fab button-fab-bottom-right expanded button-calm drop"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-crtgrp').classList.toggle('on');
                    }, 50);
                    document.getElementById('fab-crtgrp').style.display = 'none';
                }
            }
        }
    })
    .state('app.choicemdl', {
        url: '/poll_choice_model',
        views: {
            'menuContent': {
                templateUrl: 'templates/pollChoice-model.html',
                controller: 'PollChoiceModalCtrl'
            }
            ,
            'fabContent': {
                template: '<button id="fab-crtgrp" class="button button-fab button-fab-bottom-right expanded button-calm drop"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-crtgrp').classList.toggle('on');
                    }, 50);
                    document.getElementById('fab-crtgrp').style.display = 'none';
                }
            }
        }
    })
    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900 drop"><i class="icon ion-plus"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 50);
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
