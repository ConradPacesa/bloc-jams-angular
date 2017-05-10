(function() {
    SearchCtrl.$inject = ['$firebaseArray', 'Search', 'Fixtures', '$state', '$stateParams']
    function SearchCtrl($firebaseArray, Search, Fixtures, $state, $stateParams) {
        var vm = this;
        vm.find = searchTitleArtistSong;
        vm.searchResults = [];

        function searchTitleArtistSong(searchQuery) {
            search_by_album_title(searchQuery);

            function search_by_album_title(searchQuery) {
                var results = Search.lookUpByTitle(searchQuery);
                results.once('value', function(snapshot) {
                    results = snapshot.val();
                    if (results === null) {
                        search_by_album_artist(searchQuery);
                    } else {
                    vm.searchResults = results;
                    showResults();
                    }
                });
            }
            function search_by_album_artist(searchQuery) {
                var results = Search.lookUpByArtist(searchQuery);
                results.once('value', function(snapshot) {
                    results = snapshot.val();
                    if (results === null) {
                        search_by_song(searchQuery);
                    } else {
                    vm.searchResults = results;
                    showResults();
                    }
                });
            }
            function search_by_song(searchQuery) {
                var results = Search.lookUpBySong(searchQuery);
                results.once('value', function(snapshot) {
                    results = snapshot.val();
                    vm.searchResults = results;
                    showResults();
                });
            }
            function showResults () {
                if (vm.searchResults === null) {
                    alert("No results, try a different spelling!");
                } else {
                    console.log(vm.searchResults[Object.keys(vm.searchResults)[0]].albumId);

                    $state.go("album", {albumId: vm.searchResults[Object.keys(vm.searchResults)[0]].albumId});
                }
            }
        }
    }

    angular
        .module('blocJams')
        .controller('SearchCtrl', SearchCtrl);
})();
