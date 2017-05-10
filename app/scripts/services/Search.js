(function() {
    Search.$inject = ['$log', '$firebaseArray'];
    function Search($log, $firebaseArray) {
        var Search = {};
        var albumsRef = firebase.database().ref().child('albums');
        var songsRef = firebase.database().ref().child('songs');
        var results = [];

        Search.lookUpByTitle = function(search) {
            var query = albumsRef.orderByChild("title").equalTo(search);
            return query;
        }
        Search.lookUpByArtist = function(search) {
            var query = albumsRef.orderByChild("artist").equalTo(search);
            return query;
        }
        Search.lookUpBySong = function(search) {
            var query = songsRef.orderByChild("title").equalTo(search);
            return query;
        }

        return Search;
    }

    angular
        .module('blocJams')
        .factory('Search', Search);
})();
