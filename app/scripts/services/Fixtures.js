(function() {
    function Fixtures($firebaseArray) {
        var Fixtures = {};
        // var database = firebase.database();
        // var ref = firebase.database().ref().child('AlbumPicasso');
        // var albumPicasso = $firebaseArray(ref);
        Fixtures.albumsRef = firebase.database().ref().child("albums");
        Fixtures.songsRef = firebase.database().ref().child("songs");
        Fixtures.albums = $firebaseArray(Fixtures.albumsRef);
        Fixtures.songs = $firebaseArray(Fixtures.songsRef);

            // albumPicasso = {
        //
        //     title: 'The Colors',
        //     artist: 'Pablo Picasso',
        //     label: 'Cubism',
        //     year: '1881',
        //     albumArtUrl: '/assets/images/album_covers/01.png',
        //     songs: [
        //         { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
        //         { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
        //         { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
        //         { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
        //         { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
        //     ]
        // };
        //
        // var albumMarconi = {
        //     title: 'The Telephone',
        //     artist: 'Guglielmo Marconi',
        //     label: 'EM',
        //     year: '1909',
        //     albumArtUrl: '/assets/images/album_covers/20.png',
        //     songs: [
        //         { title: 'Hello, Operator?', duration: '1:01' },
        //         { title: 'Ring, ring, ring', duration: '5:01' },
        //         { title: 'Fits in your pocket', duration: '3:21' },
        //         { title: 'Can you hear me now?', duration: '3:14' },
        //         { title: 'Wrong phone number', duration: '2:15' }
        //     ]
        // };
        // var collection = [
        //     { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue', albumId: '-KjG33PKRbi9etdI6RL6' },
        //     { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green', albumId: '-KjG33PKRbi9etdI6RL6' },
        //     { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red', albumId: '-KjG33PKRbi9etdI6RL6' },
        //     { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink', albumId: '-KjG33PKRbi9etdI6RL6' },
        //     { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta', albumId: '-KjG33PKRbi9etdI6RL6' },
        //     { title: 'Hello, Operator?', duration: '255', audioUrl: '/assets/music/hello' , albumId: '-KjG30BsW6OnkbzYxmlR' },
        //     { title: 'Ring, ring, ring', duration: '282', audioUrl: '/assets/music/ring', albumId: '-KjG30BsW6OnkbzYxmlR' },
        //     { title: 'Fits in your pocket', duration: '229', audioUrl: '/assets/music/fits', albumId: '-KjG30BsW6OnkbzYxmlR' },
        //     { title: 'Can you hear me now?', duration: '75', audioUrl: '/assets/music/can', albumId: '-KjG30BsW6OnkbzYxmlR' },
        //     { title: 'Wrong phone number', duration: '159', audioUrl: '/assets/music/wrong', albumId: '-KjG30BsW6OnkbzYxmlR' }
        // ];
        // //
        // angular.forEach(collection, function(song) {
        //     //debugger;
        //     songs.$add(song);
        // });

        Fixtures.getCollection = function() {
            return Fixtures.albums;
        }


        return Fixtures;
    }

    angular
        .module('blocJams')
        .factory('Fixtures', ['$firebaseArray', Fixtures]);
})();
