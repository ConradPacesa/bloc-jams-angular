(function() {
    function Authentication($log) {
        var githubProvider = new firebase.auth.GithubAuthProvider();

        return {
          signIn: function () {
            return firebase.auth().signInWithPopup(githubProvider).then(function (result) {
              return result.user;
            }).catch(function (error) {
              $log.error("Authentication failed!");
              $log.error(error);
            });
          },

          signOut: function () {
            return firebase.auth().signOut();
          }
        };
    }

    angular
        .module('blocJams')
        .factory('Authentication', ['$log', Authentication]);
})();
