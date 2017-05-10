(function() {
    Album.$inject = ['Fixtures', '$stateParams', '$log'];
    function Album(Fixtures, $stateParams, $log) {
        var Album = {};
        this.currentAlbum = null;
        this.currentSongs = null;

        Album.setCurrentAlbum = function(input) {
            var theCurrentAlbum;
            Fixtures.albumsRef.orderByChild('albumId').equalTo(input).on('value', function(snapshot) {
                theCurrentAlbum = snapshot.val();
            });
            this.currentAlbum = theCurrentAlbum;
        }

        Album.setCurrentSongs = function (input) {
            var currentSongsList;
            Fixtures.songsRef.orderByChild('albumId').equalTo(input).once('value', function(snapshot) {
                currentSongsList = snapshot.val();
            });
            this.currentSongs = currentSongsList;
        }

        Album.getAlbum = function() {
            return this.currentAlbum;
        }

        Album.getSongs = function() {
            return this.currentSongs;
        }

        return Album;
    }

    angular
        .module('blocJams')
        .factory("Album", Album);
})();
