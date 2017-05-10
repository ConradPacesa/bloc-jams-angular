(function() {
    function PlayerBarCtrl(Fixtures, SongPlayer, Album) {
        this.albumData = Album.getAlbum();
        this.songPlayer = SongPlayer;
    }

    angular
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', "Album", PlayerBarCtrl]);
})();
