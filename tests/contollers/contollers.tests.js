describe('controllers', function(){


    var scope;

    // load the controller's module
    beforeEach(angular.mock.module('starter'));
    beforeEach(module('ionic'));
    beforeEach(module('ionic-material'));
    beforeEach(module('ionMdInput'));
    beforeEach(module('ngCordova'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('LoginCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have login controller', function(){
        expect(scope.t).toBeDefined();
    });

});
