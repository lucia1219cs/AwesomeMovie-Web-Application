'use strict';

angular.module('AwesomeMovie',['ui.router', 'ngResource', 'ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  :'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
            // route for the movies page
            .state('app.movies', {
                url: 'movies',
                views: {
                    'content@': {
                        templateUrl : 'views/movies.html',
                        controller  : 'MoviesController'
                    }
                }
            })

            // route for the moviedetail page
            .state('app.moviedetail', {
                url: 'movies/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/moviedetail.html',
                        controller  : 'MovieDetailController'
                   }
                }
            })
    
            // route for the favorites page
            .state('app.favorites', {
                url:'favorites',
                views: {
                    'content@': {
                        templateUrl : 'views/favorites.html',
                        controller  : 'FavoritesController'
                     }
                }
            })
    
            // route for the promotions page
            .state('app.promotions', {
                url:'promotions',
                views: {
                    'content@': {
                        templateUrl : 'views/promotions.html',
                        controller  : 'PromotionsController'
                     }
                }
            })
    
            // route for the contactus page
            .state('app.contact', {
                url:'contact',
                views: {
                    'content@': {
                        templateUrl : 'views/contact.html',
                        controller  : 'CommentController'
                     }
                }
            });
            $urlRouterProvider.otherwise('/');
    })
;
