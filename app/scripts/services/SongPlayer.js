(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {}
        /**
        * @desc Current playing album object
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
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
        };
        /**
        * @function getSongIndex
        * @desc Returns the index number of the selected song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        }
        /**
        * @desc Active song object from list of songs
        * @type {object}
        */
        SongPlayer.currentSong = null;
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
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
