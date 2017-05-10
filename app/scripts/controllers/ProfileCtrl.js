(function() {
    function ProfileCtrl($rootScope, Authentication, Fixtures, SongPlayer) {
        this.user = $rootScope.authUser;
        this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('ProfileCtrl', ['$rootScope', 'Authentication', 'Fixtures', 'SongPlayer', ProfileCtrl]);
})();
