angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'ui.select', 'imageupload'])

    .controller('headerctrl', function($scope, TemplateService, $state) {
        $scope.template = TemplateService;
        if (!$.jStorage.get("user")) {
            $state.go("login");
        }
        $scope.logout = function() {
            $.jStorage.flush();
            $state.go("login");
        };
    })

    .controller('LoginCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("login");
        $scope.menutitle = NavigationService.makeactive("Login");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.login = {};
        $scope.showError = false;
        $scope.loginAdmin = function() {
            NavigationService.loginAdmin($scope.login, function(data) {
                console.log(data);
                if (data.status === true) {
                    $scope.showError = false;
                    $.jStorage.set("user", data.response);
                    $state.go("dashboard");
                } else {
                    $scope.showError = true;
                    $timeout(function() {
                        $scope.showError = false;
                    }, 3000);
                }
            });
        };
    })

    .controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("dashboard");
        $scope.menutitle = NavigationService.makeactive("Dashboard");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

    })

    .controller('bannerCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("banner");
        $scope.menutitle = NavigationService.makeactive("Schools");
        TemplateService.title = $scope.menutitle;
        $scope.adminURL = adminURL;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.contentLoaded = false;
        $scope.banners = [];
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;

        $scope.reload = function(val) {
            NavigationService.getAllBanners(function(resp) {
                if (resp.status) {
                    $scope.contentLoaded = true;
                    $scope.banners = resp.response;
                } else {
                    $scope.banners = [];
                }
            });
        };
        $scope.reload();

        $scope.confDelete = function() {
            NavigationService.deleteBanner(function(data, status) {
                console.log(data);
                $scope.reload();
            });
        };
        $scope.deleteFunc = function(id) {
            $.jStorage.set("deleteBanner", id);
            $uibModal.open({
                animation: true,
                templateUrl: "views/content/delete.html",
                scope: $scope
            });
        };
    })
    .controller('createBannerCtrl', function($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createbanner");
        $scope.menutitle = NavigationService.makeactive("Banner");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Create Banner";
        $scope.banner = {};
        $scope.sportList = {};

        $scope.saveBanner = function() {
            NavigationService.saveBanner($scope.banner, function(data) {
                if (data.status !== false) {
                    $state.go('banner');
                }
            });
        };
        $scope.addContent = function(select) {
            $scope.sportList.tableContent = select.selected;
        };
    })
    .controller('editBannerCtrl', function($scope, TemplateService, NavigationService, $timeout, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("createbanner");
        $scope.menutitle = NavigationService.makeactive("Banner");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.template.type = 1;
        $scope.pageName = "Edit Banner";
        $scope.banner = {};
        $scope.sportList = {};
        $scope.getOneBanner = function() {
            NavigationService.getOneBanner($stateParams.id, function(response) {
                if (response.status) {
                    $scope.banner = data.response;
                    $scope.banner.status = $scope.banner.status.toString();
                }
            });
        };
        $scope.getOneBanner();
        $scope.saveBanner = function() {
            NavigationService.saveBanner($scope.banner, function(data) {
                if (data.status !== false) {
                    $state.go('banner');
                }
            });
        };
        $scope.addContent = function(select) {
            $scope.sportList.tableContent = select.selected;
        };
    })


    .controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function() {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
        };
    });
