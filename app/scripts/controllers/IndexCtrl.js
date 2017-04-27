(function() {
    function IndexCtrl($log, $rootScope, Authentication) {
        var vm = this;
        vm.auth = Authentication;
        vm.user = null;
        vm.isLoggedIn = false;

        activate();

        $rootScope.$on("authChanged", function(event, data) {
            debugger;
            console.log(event, data);
            if (data.firebaseUser) {
                vm.user = data.firebaseUser;
                vm.isLoggedIn = true;
            } else {
                vm.user = null;
                vm.isLoggedIn = false;
            }
        });

        function activate() {
            $log.debug("Activating IndexCtrl");
        }


        vm.logIn = function() {
            vm.auth.signIn();
        };

        vm.logOut = function() {
            debugger;
            vm.auth.signOut();
        };
    }
    angular
        .module('blocJams')
        .controller('IndexCtrl', ["$log", "$rootScope", "Authentication", IndexCtrl]);
})();
