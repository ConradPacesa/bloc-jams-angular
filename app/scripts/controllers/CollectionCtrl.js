(function() {
    CollectionCtrl.$inject = ["Fixtures", "Album"];
    function CollectionCtrl(Fixtures, Album) {
        this.albums = Fixtures.getCollection();
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();
