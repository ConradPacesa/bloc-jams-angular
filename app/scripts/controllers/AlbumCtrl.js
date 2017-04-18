(function() {
    function AlbumCtrl(Fixtures, Debug) {
        this.debug = Debug.getDebug();
        this.albumData = Fixtures.getAlbum();
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
