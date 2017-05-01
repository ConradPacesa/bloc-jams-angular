(function() {
    function IndexCtrl($log, $scope, Authentication) {
        var vm = this;
        vm.user = null;
        vm.logIn = logIn;
        vm.logOut = logOut;

        // activate();
        //
        // function activate() {
        //     $log.debug("Activating IndexCtrl");
        // }

        function logIn () {
          return Authentication.signIn().then(setUser);
        }

        function logOut () {
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
        .controller('IndexCtrl', ["$log", "$scope", "Authentication", IndexCtrl]);
})();
