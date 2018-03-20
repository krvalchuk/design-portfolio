var app = angular.module("valchukDesign", ['ngSanitize']);
// app.config(function ($routeProvider) {
//     $routeProvider
//         .when("/header", {
//             templateUrl: "views/header.html"
//         });
// });

app.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.controller("menuCtrl", function ($scope) {

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var menuHeight = $('#menu').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();

        if (st >= 200) {
            $('#menu').addClass('small');
        } else {
            $('#menu').removeClass('small');
        }

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > menuHeight) {
            // Scroll Down
            $('#menu').addClass('hide');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('#menu').removeClass('hide');
            }
        }

        lastScrollTop = st;


    }
});

app.controller("mainCtrl", function ($scope) {

    $scope.activeMenuId = 'home-link';

    $scope.scrollToStart = function (hash) {
        document.querySelector("#" + hash).scrollIntoView({
            behavior: 'smooth',
            block: "start"
        });
        $scope.activeMenuId = hash + "-link";
    };

    $scope.scrollToCenter = function (hash) {
        document.querySelector("#" + hash).scrollIntoView({
            behavior: 'smooth'
        });
        $scope.activeMenuId = hash + "-link";
    };

    $scope.scrollToBottom = function (hash) {
        document.querySelector("#" + hash).scrollIntoView({
            behavior: 'smooth',
            block: "end"
        });
        $scope.activeMenuId = hash + "-link";
    };

    $scope.resizeTextarea = function (id) {
        var tx = $('#' + id)[0];
        tx.style.height = 'auto';
        tx.style.height = (tx.scrollHeight) + 'px';
    };

    $scope.selectText = function (e) {
        var curElement = angular.element(e.currentTarget)[0];
        var range = document.createRange();
        var selection = window.getSelection();
        range.selectNodeContents(curElement);

        selection.removeAllRanges();
        selection.addRange(range);
    };

    $scope.works = [
        //supperbox
        {
            'graphicId': 'supperbox',
            'name': 'supper box',
            'streams': ['landing page', 'identity', 'facebook ads', 'product design'],
            'description': 'A set of products for cooking a gourmet at home.',
            'audience': 'Young couples aged 20 to 30 years.',
            'values': 'Surprise. Refined food. Eco.',
            'link': 'http://www.supperbox.com.ua',
            'youtubeHash': 'gEswCKW1kbg'
        },
        //robobay
        {
            'graphicId': 'robobay',
            'name': 'robobay',
            'streams': ['product site', 'identity'],
            'description': 'The cloud platform for trading robots.',
            'audience': 'Algorithmic traders. Men aged 25 to 65 years.',
            'values': 'Security. Modernity. Simplicity.',
            'link': 'http://www.robobay.ch',
            'youtubeHash': 'vFKfqrO4iTA'
        },
        //decoupage
        {
            'graphicId': 'decoupage',
            'name': 'beautiful decisions for simple things',
            'streams': ['landing page'],
            'description': 'Decoupage master classes from Ksenia Mogilnitskaya.',
            'audience': 'Women aged 25 to 40 years, living in Kiev.',
            'values': 'Creativity. Entertainment. Affordable price.',
            'link': 'http://www.parmax.kiev.ua',
            'youtubeHash': 'ep-N6x5liXg'
        }
    ];

    $scope.rotateCard = function (e) {
        var curElement = angular.element(e.currentTarget);
        if (curElement.hasClass('rotated')) {
            curElement.removeClass('rotated');
        } else {
            curElement.addClass('rotated');
        }
    };

    $scope.factsSets = [
        [
            {
                'title': 'interested in',
                'info': 'psychologies',
                'details': 'Analyze myself <br> and people behaviour',
                'iconName': 'brain'
            },
            {
                'title': 'i am',
                'info': 'curious',
                'details': 'Exploration <br> helps to release <br> my hidden talents',
                'iconName': 'puzzle'
            },
            {
                'title': 'crazy about',
                'info': 'schnauzers',
                'details': 'These hipster dogs <br> stole my heart',
                'iconName': 'dog'
            }
        ],
        [
            {
                'title': 'favourite sport',
                'info': 'snowboard',
                'details': 'Speed and snow <br> Woohooo!',
                'iconName': 'snowboard'
            },
            {
                'title': 'my inspiration',
                'info': 'travels',
                'details': 'Journeys <br> are my fuel',
                'iconName': 'suitcase'
            },
            {
                'title': 'can not stand',
                'info': 'boredom',
                'details': 'Stagnation kills. <br> If I am bored, it`s a time <br> for new aims!',
                'iconName': 'ghost'
            }
        ]
    ];

});

app.controller("storyCtrl", function ($scope) {
    var visibleItemsNum = 4;
    var currentFirstVisibleItemIndex = 2;
    var scrollStep = 100 / visibleItemsNum;

    $scope.beforeBtnEnabled = true;
    $scope.afterBtnEnabled = false;

    $scope.storyFacts = [
        {
            "title": "Education at University",
            "details": "System Engineering <br> Master`s degree",
            "months": "September - May",
            "years": "2010 - 2016",
            "isFirst": true
        },
        {
            "title": "Practical course at <br> NetCracker",
            "details": "Programming in Java",
            "months": "January - July",
            "years": "2014"
        },
        {
            "title": "Work at Luxoft",
            "details": "Java developer <br> Fullstack developer",
            "months": "October - November",
            "years": "2014 - 2015"
        },
        {
            "title": "Freelancer",
            "details": "Frontend developer",
            "months": "March - February",
            "years": "2016 - 2017"
        },
        {
            "title": "Education at Skillbox",
            "details": "Web design <br> Photoshop advanced",
            "months": "November - February",
            "years": "2016 - 2017"
        },
        {
            "title": "Freelancer",
            "details": "Web design <br> Web development",
            "months": "March - Today",
            "years": "2017",
            "isLast": true
        }
    ];

    $scope.storyItemHover = function storyItemHover(e) {
        angular.element(e.currentTarget.parentNode.parentNode).addClass('hovered');
    };

    $scope.storyItemLeave = function storyItemLeave(e) {
        angular.element(e.currentTarget.parentNode.parentNode).removeClass('hovered');
    };

    function toggleBeforeBtn() {
        $scope.beforeBtnEnabled = !$scope.beforeBtnEnabled;
    }

    function toggleAfterBtn() {
        $scope.afterBtnEnabled = !$scope.afterBtnEnabled;
    }

    function checkBtnsState() {
        var storyScrolledToEnd = (currentFirstVisibleItemIndex == 0);
        var storyScrolledToStart = (currentFirstVisibleItemIndex == ($scope.storyFacts.length - visibleItemsNum));

        //before Btn
        if ((!$scope.beforeBtnEnabled && !storyScrolledToEnd) || (storyScrolledToEnd && $scope.beforeBtnEnabled)) {
            toggleBeforeBtn();
        }

        //after Btn
        if ((!$scope.afterBtnEnabled && !storyScrolledToStart) || (storyScrolledToStart && $scope.afterBtnEnabled)) {
            toggleAfterBtn();
        }
    }

    $scope.scrollStoryRight = function () {
        if (currentFirstVisibleItemIndex > 0) {
            $("#scrollArea").stop(false, true).animate({right: "-=" + scrollStep + "%"}, {duration: 400});
            currentFirstVisibleItemIndex -= 1;
            checkBtnsState()
        }
    };

    $scope.scrollStoryLeft = function () {
        if (currentFirstVisibleItemIndex < ($scope.storyFacts.length - visibleItemsNum)) {
            $("#scrollArea").stop(false, true).animate({right: "+=" + scrollStep + "%"}, {duration: 400});
            currentFirstVisibleItemIndex += 1;
            checkBtnsState()
        }
    };
});

app.controller("feedbackCtrl", function ($scope, $http) {
    // var that = this;
    $scope.formState = 'interactive';
    $scope.formData = {
        name: '',
        email: '',
        message: ''
    };

    // $scope.nameHint = form.nameInput.$invalid ? 'Name is required' : 'Name:';

    $scope.emailPattern = '/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/';

    $scope.sendQuestion = function (formIsValid) {
        if (formIsValid) {
            $http.post('/email', $scope.formData).then(function (response) {
                $scope.formState = 'report';
                console.log("message sent successfully");
            }).catch(function (response) {
                console.error("message send failed");
            })
        }
        // var form = $('#feedback-form-content');
        // form.validate();
        // var formIsValid = form.name.$valid;
        // console.log(formIsValid);
        //TODO if form data valid

        // $http.post('/email',$scope.formData).
        // then(function(response) {
        //     //TODO Write user that message is sent
        //     console.log("message sent successfully");
        // }).catch(function(response) {
        //     console.error("message send failed");
        // })
    }
});