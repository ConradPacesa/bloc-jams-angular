(function() {
    function Authentication($rootScope, $firebaseAuth) {

         Authentication.signIn = function() {
            var provider = new firebase.auth.GithubAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        }

        firebase.auth().onAuthStateChanged(function(firebaseUser) {
            Authentication.firebaseUser = firebaseUser;
            if (firebaseUser) {
                $rootScope.$broadcast("authChanged", {firebaseUser});
                console.log('Signed in as:', firebaseUser.uid);
            } else {
                console.log('Singed out');
            }
        });

        Authentication.signOut = function() {
            firebase.auth().signOut().then(function() {

            }).catch(function(error) {

            });
        }

        return Authentication;
    }

    angular
        .module('blocJams')
        .factory('Authentication', ['$rootScope', '$firebaseAuth', Authentication]);
})();
