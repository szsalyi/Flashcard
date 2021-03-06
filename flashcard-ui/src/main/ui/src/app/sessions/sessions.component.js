angular.module('fc-app').component('fcSessions', {
    bindings : {cards :  '<' },
    templateUrl : 'app/sessions/sessions.component.html',
    controller : function ($timeout, fcCardService, fcArrayUtils, fcSessionService,$stateParams, $rootScope, $state) {
        var ctrl = this;

        var tz = 0;

        ctrl.degree = 'red';
        ctrl.userGuess = '';
        ctrl.index = 0;

        ctrl.compare = null;

        ctrl.counter = 0;
        ctrl.score = 0;
        ctrl.$onInit = function() {
            fcArrayUtils.shuffle(ctrl.cards);
            cardsNumber = ctrl.cards.length;
            ctrl.currentCard = ctrl.cards[0];
            console.log(ctrl.currentCard);

        };

        var tzCalculator = function (length) {
            return (Math.round( ( 400 / 2 ) /
                Math.tan( ( ( Math.PI * 2 ) / length ) / 2 ) ));
        };

        ctrl.getCurrentCardCss = function () {
            return ctrl.generateCss(ctrl.counter * -1, true);
        };

        ctrl.generateCss = function (index, current) {
            var deg = 0;
            degree = Math.round(360/(ctrl.cards.length + 1));
            tz = tzCalculator(ctrl.cards.length );
            console.log(tz);
            if(current) {
                tz = -Math.abs(tz);
            }
            deg = degree * index;
            return {
                '-webkit-transform' : 'rotateY(' + deg + 'deg) translateZ(' + tz + 'px)',
            };
        };

        ctrl.guessing = function () {
            ctrl.getCurrentCardCss();
            ctrl.currentCard = ctrl.cards[ctrl.counter];
            ctrl.compare = fcCardService.compareCards(ctrl.cards[ctrl.counter].back, ctrl.userGuess);
            if(ctrl.compare){
                ctrl.score++;
            }
            console.log(ctrl.score);
            ctrl.counter++;
            $timeout(function () {
                ctrl.userGuess = '';
                ctrl.compare = null;
            }, 1000);
        };
        
        ctrl.saveSession = function () {
            var percent = ctrl.score/ctrl.cards.length * 100;
            var date = new Date();
            var session = {
                percent: Math.round(percent),
                score: Math.round(percent),
                date: date,
                category: {
                    id: $stateParams.categoryId
                },
                user: $rootScope.loggedUser
            }
            ;
            return fcSessionService.save(session).then(function (value) {
                $state.go('user.profile');
            });
        };

        ctrl.sessions = null;

        ctrl.getSessions = function () {
            return fcSessionService.getAllByUserId($rootScope.loggedUser.id)
                .then(function (value) {

                    ctrl.session = value.data;
                });
        };
        ctrl.categoryIdd = $stateParams.categoryId;

    },
    controllerAs : 'sessionsCtrl'
});
