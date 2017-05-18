(function() {
    SongPlayer.$inject = ['$rootScope', 'Fixtures', 'Album', '$stateParams'];
    function SongPlayer($rootScope, Fixtures, Album, $stateParams) {
        var SongPlayer = {};
        /**
        * @desc Buzz object audio file
        * @type {object}
        */
        var currentBuzzObject = null;
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * binds time update from buzz object to rootScope
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
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            SongPlayer.autoPlay();
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
            return SongPlayer.currentSongs.indexOf(song);
        }
        /**
        * @desc Active song object from list of songs
        * @type {object}
        */
        SongPlayer.currentSong = null;
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {number}
        */
        SongPlayer.currentTime = null;
        /**
        * @desc Sets default value of volume to 80
        * @type {number}
        */
        SongPlayer.volume = 80;
        /**
        * @desc Stores the previous value of volume when we change the volume
        * @type {number}
        */
        SongPlayer.previousVolume = null;
        /**
        * @method setVolume
        * @desc Changes the volume in the currentBuzzObject
        * @param {number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
                SongPlayer.previousVolume = SongPlayer.volume;
                SongPlayer.volume = volume;
            }
        };
        /**
        * @method revertVolume
        * @desc Reverts the volume back to previous value
        */
        SongPlayer.revertVolume = function() {
            SongPlayer.setVolume(SongPlayer.previousVolume);
        }
        /**
        * @desc Current playing album object
        * @type {object}
        */
        SongPlayer.currentAlbum = Album.getAlbum();
        SongPlayer.currentSongs = Album.getSongs();
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
                var song = SongPlayer.currentSongs[currentSongIndex];
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

            if (currentSongIndex >= SongPlayer.currentSongs.length) {
                stopSong(song);
            } else {
                var song = SongPlayer.currentSongs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        /**
        * @function autoPlay
        * @desc Automatically plays the next song when current song ends.
        */
        SongPlayer.autoPlay = function() {
            if (currentBuzzObject) {
                currentBuzzObject.bind('ended', function() {
                    SongPlayer.next();
                });
            }
        };
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
