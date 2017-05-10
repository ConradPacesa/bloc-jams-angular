(function() {
    AlbumCtrl.$inject = ['Fixtures', 'SongPlayer', '$stateParams', 'Album'];
    function AlbumCtrl(Fixtures, SongPlayer, $stateParams, Album) {

        activate($stateParams.albumId);

        function activate(input) {
            setAlbum(input);
        }

        function setAlbum(album) {
            Album.setCurrentAlbum(album);
            Album.setCurrentSongs(album);
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
