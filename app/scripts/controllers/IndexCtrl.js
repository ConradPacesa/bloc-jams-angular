(function() {
    function IndexCtrl($log, $scope, Authentication, Search, $state) {
        var vm = this;
        vm.user = null;
        vm.logIn = logIn;
        vm.logOut = logOut;

        activate();

        function activate() {
            $log.debug("Activating IndexCtrl");
        }

        function logIn () {
          return Authentication.signIn().then(setUser);
        }

        function logOut () {
            $state.go("landing");
          return Authentication.signOut().then(setUser);
        }

        function setUser (user) {
          $scope.$apply(function(){
            vm.user = user;
            $log.debug("User: ", vm.user);
          })
        }
    }
    angular
        .module('blocJams')
        .controller('IndexCtrl', ["$log", "$scope", "Authentication", "Search", "$state", IndexCtrl]);
})();
