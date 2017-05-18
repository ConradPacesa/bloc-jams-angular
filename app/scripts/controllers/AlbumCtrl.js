(function() {
    AlbumCtrl.$inject = ['Fixtures', 'SongPlayer', '$stateParams', 'Album'];
    function AlbumCtrl(Fixtures, SongPlayer, $stateParams, Album) {

        activate();

        function activate() {
            var currentAlbumId = $stateParams.albumId;
            setAlbum(currentAlbumId);
        }

        function setAlbum(albumId) {
            Album.setCurrentAlbum(albumId);
            Album.setCurrentSongs(albumId);
        }

        this.albumData = Album.getAlbum();
        this.songs = Album.getSongs();
        this.songPlayer = SongPlayer;

        console.log($stateParams.albumId);
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
