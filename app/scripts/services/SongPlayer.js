(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        /**
        * @desc Buzz object audio file
        * @type {object}
        */
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };
        /**
        * @function playSong
        * @desc Starts playing the loaded audio file, sets playing variable of selected song to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
            SongPlayer.currentPlayingAlbum = Fixtures.getAlbum();
        };
        /**
        * @function stopSong
        * @desc Stops playing the loaded audio file, sets playing variable of selected song to null
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        /**
        * @function getSongIndex
        * @desc Returns the index number of the selected song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
        }
        /**
        * @desc Active song object from list of songs
        * @type {object}
        */
        SongPlayer.currentSong = null;
        /**
        * @desc Current playing album object
        * @type {object}
        */
        SongPlayer.currentAlbum = Fixtures.getAlbum();
        /**
        * @desc Album of the currnet playing song used for ng-show in player bar
        * @type {object}
        */
        SongPlayer.currentPlayingAlbum = false;
        /**
        * @method play
        * @desc Executes playSong function, and sets a new song if selected song is not the SongPlayer.currentSong
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        /**
        * @method pause
        * @desc pauses currently playing audio file, sets playing variable to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
        * @method previous
        * @desc If current playing song is first song, stops playing,
        *       othewise starts playing previous song in index.
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @method next
        * @desc If current playing song is last song, stops playing,
        *       othewise starts playing next song in index.
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= SongPlayer.currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
