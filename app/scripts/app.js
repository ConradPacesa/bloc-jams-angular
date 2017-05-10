(function() {
    function config($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state('landing', {
                url:'/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html',
                authenticate: false
            })
            .state('album', {
                url: '/album/:albumId',
                controller: 'AlbumCtrl as album',
                templateUrl: '/templates/album.html',
                authenticate: true
            })
            .state('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html',
                authenticate: true
            })
            .state('profile', {
                url: '/profile',
                controller: 'ProfileCtrl as profile',
                templateUrl: '/templates/profile.html',
                authenticate: true
            });

            $urlRouterProvider.otherwise('/');
    }

    angular
        .module('blocJams', ['ui.router', 'firebase'])
        .config(config)
        .run(function ($rootScope, $state, Authentication) {
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
                if (toState.authenticate && !$rootScope.authUser) {
                    $state.transitionTo("landing");
                    event.preventDefault();
                }
            });
        });
})();
