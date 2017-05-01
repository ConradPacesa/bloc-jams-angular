(function() {
    function Authentication($rootScope, $log) {
        var githubProvider = new firebase.auth.GithubAuthProvider();
        $rootScope.authUser = null;

        Authentication.signIn = function () {
            return firebase.auth().signInWithPopup(githubProvider).then(function (result) {
              console.log(result);
              $rootScope.authUser = result.user;
              return result.user;
            }).catch(function (error) {
              $log.error("Authentication failed!");
              $log.error(error);
            });
        };

        Authentication.signOut = function () {
            return firebase.auth().signOut();
        };
        return Authentication;
    }

    angular
        .module('blocJams')
        .factory('Authentication', ['$rootScope', '$log', Authentication]);
})();
