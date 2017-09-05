'use strict';

angular.module('AwesomeMovie')

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function($scope, $state, $rootScope, ngDialog, AuthFactory) {
    
    $scope.message="Loading ...";
    $scope.loggedIn = false;
    $scope.username = '';
    
    $scope.bookTickets = function () {
        ngDialog.open({ template: 'views/tickets.html', scope: $scope, className: 'ngdialog-theme-default', controller:"TicketsController" });
    };
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }

    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };

    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };

    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });

    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });

    $scope.stateis = function(curstate) {
       return $state.is(curstate);
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.loginData = $localStorage.getObject('userinfo','{}');

    $scope.doLogin = function() {
        if($scope.rememberMe) {
           $localStorage.storeObject('userinfo',$scope.loginData);
        }

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };

    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };

}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.register={};
    $scope.loginData={};

    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);

        ngDialog.close();

    };
}])

.controller('TicketsController', ['$scope', 'ngDialog', 'moviesFactory', 'ticketsFactory', function($scope, ngDialog, moviesFactory, ticketsFactory) {
        
    $scope.movies = moviesFactory.query({
        featured: true
    })
    .$promise.then(
        function(response) {
            $scope.movies = response;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
    });
    
    $scope.bookTickets = function() {
        console.log($scope.ticket);
        ticketsFactory.save($scope.ticket);
        
        ngDialog.close();
    };
}])

.controller('HomeController', ['$scope', 'moviesFactory', function($scope, moviesFactory) {

    $scope.showMovies = false;
    $scope.message="Loading ...";
    
    $scope.movies = moviesFactory.query({
        featured: true
    })
    .$promise.then(
        function(response) {
            $scope.movies = response;
            $scope.showMovies = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
    });
}])
    
.controller('MoviesController', ['$scope', 'moviesFactory', 'favoritesFactory', function($scope, moviesFactory, favoritesFactory) {
        
    $scope.tab = 1;
    $scope.filtText = '';    
    $scope.showDetails = false;
    $scope.showFavorites = false;
    $scope.showMovies = false;
    $scope.message = "Loading ...";
    
    $scope.movies = moviesFactory.query(
        function(response) {
            $scope.movies = response;
            $scope.showMovies = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
    });

    $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "Action";
        }
        else if (setTab === 3) {
            $scope.filtText = "Adventure";
        }
        else if (setTab === 4) {
            $scope.filtText = "Animation";
        }
        else if (setTab === 5) {
            $scope.filtText = "Comedy";
        }
        else if (setTab === 6) {
            $scope.filtText = "Crime";
        }
        else if (setTab === 7) {
            $scope.filtText = "Fantasy";
        }
        else if (setTab === 8) {
            $scope.filtText = "Horror";
        }
        else if (setTab === 9) {
            $scope.filtText = "Romance";
        }
        else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };
    
    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
    
    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(movieid) {
        console.log('Add to favorites', movieid);
        favoritesFactory.save({_id: movieid});
        $scope.showFavorites = !$scope.showFavorites;
    };
}])

.controller('FavoritesController', ['$scope', '$state', 'favoritesFactory', function ($scope, $state, favoritesFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showDelete = false;
    $scope.showMovies = false;
    $scope.message = "Loading ...";
    
    favoritesFactory.query(
        function(response) {
            $scope.movies = response.movies;
            $scope.showMovies = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
    });

    $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "Action";
        }
        else if (setTab === 3) {
            $scope.filtText = "Adventure";
        }
        else if (setTab === 4) {
            $scope.filtText = "Animation";
        }
        else if (setTab === 5) {
            $scope.filtText = "Comedy";
        }
        else if (setTab === 6) {
            $scope.filtText = "Crime";
        }
        else if (setTab === 7) {
            $scope.filtText = "Fantasy";
        }
        else if (setTab === 8) {
            $scope.filtText = "Horror";
        }
        else if (setTab === 9) {
            $scope.filtText = "Romance";
        }
        else {
            $scope.filtText = "";
        }
    };
    
    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleDelete = function () {
        $scope.showDelete = !$scope.showDelete;
    };

    $scope.deleteFavorite = function(movieid) {
        console.log('Delete favorites', movieid);
        favoritesFactory.delete({id: movieid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
}])

.controller('MovieDetailController', ['$scope', '$state', '$stateParams', 'moviesFactory', 'reviewFactory', function($scope, $state, $stateParams, moviesFactory, reviewFactory) {

    $scope.movie = {};
    $scope.showMovie = false;
    $scope.message="Loading ...";
    
    $scope.movie = moviesFactory.get({
        id: $stateParams.id
    })
    .$promise.then(
        function (response) {
            $scope.movie = response;
            $scope.showMovie = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );
    
    $scope.myreview = {
        rating: 5,
        review: ""
    };

    $scope.submitReview = function () {

        reviewFactory.save({id: $stateParams.id}, $scope.myreview);

        $state.go($state.current, {}, {reload: true});

        $scope.reviewForm.$setPristine();

        $scope.myreview = {
            rating: 5,
            comment: ""
        };
    };
    
}])

.controller('CommentController', ['$scope', 'commentFactory', function($scope, commentFactory) {
        $scope.sendComment = function() {
            console.log($scope.comment);
            commentFactory.save($scope.comment);
            $scope.comment = {name:"", email:"", subject:"", message:"" };
            $scope.commentForm.$setPristine();                    
        };
}])

.controller('PromotionsController', ['$scope', 'ngDialog', 'promotionsFactory', function($scope, ngDialog, promotionsFactory) {
    
    $scope.showPromotions = false;
    $scope.message="Loading ...";
    
    promotionsFactory.query(
        function(response) {
            $scope.promotions = response;
            $scope.showPromotions = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
    });
    
    $scope.doSubscribe = function () {
        ngDialog.open({ template: 'views/subscribe.html', scope: $scope, className: 'ngdialog-theme-default', controller:"SubscriptionController" });
    };
}])

.controller('SubscriptionController', ['$scope', 'ngDialog', 'subscriptionsFactory', function($scope, ngDialog, subscriptionsFactory) {
    
    $scope.doSubscribe = function() {
        console.log($scope.subscription);
        subscriptionsFactory.save($scope.subscription);
        
        ngDialog.close();
    };
}])
;
