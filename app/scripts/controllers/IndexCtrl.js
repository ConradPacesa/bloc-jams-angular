(function() {
    function IndexCtrl($rootScope, Authentication) {
        this.auth = Authentication;

        $rootScope.$on("authChanged", function(event) {
            console.log(event);
            if (!event.isLoggedIn) {
                this.auth = false;
            }
        })
    }
    angular
        .module('blocJams')
        .controller('IndexCtrl', ["$rootScope", "Authentication", IndexCtrl]);
})();
