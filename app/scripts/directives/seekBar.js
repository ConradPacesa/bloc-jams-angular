(function() {
    function seekBar($document) {
        /**
        * @function calculatePercent
        * @desc Calculates the horizontal percent along seek bar where event occurred
        * @param {Objects} seekBar, event
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            var offsetXPercent = Math.max(0, offsetXPercent);
            var offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
            templateUrl:'/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            /**
            * @function
            * @desc Links directive logic to DOM, holds directive logic
            * @param {Objects} scope, element, attributes
            */
            link: function(scope, element, attributes) {
                /**
                * @desc Holds value of seek bar, such as song time or vol, default set to 0
                * @type {object}
                */
                scope.value = 0;
                /**
                * @desc Holds max value of seek bar, default set to 0
                * @type {object}
                */
                scope.max = 100;
                /**
                * @desc Holds the element that matches the directive seekBar as a jquery object
                * @type {object}
                */
                var seekBar = $(element);

                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });

                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                });
                /**
                * @function percentString
                * @desc Calculates a percent based on the value and max value of a seek bar
                */
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                /**
                * @method fillStyle
                * @desc returns the width of the seek bar fill element based on calculated percent
                */
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                /**
                * @method thumbStyle
                * @desc Moves the thumb element to percentString value
                */
                scope.thumbStyle = function() {
                    return {left: percentString()};
                };
                /**
                * @method onClickSeekBar
                * @desc Updates the seek bar value based on seek bar width and location of click on seek bar
                * @param {object} event
                */
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                /**
                * @method trackThumb
                * @desc Uses $apply to constantly applly changes in value to seek bar as user drags seek bar thumb
                */
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });

                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                /**
                * @function notifyOnChange
                * @desc Notifies onChange function that scope value has changed 
                * @param {Number} newValue
                */
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                    }
                };
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
