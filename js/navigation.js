
var adminURL = "http://localhost:1337/api/";
var uploadurl = adminURL + "upload/";

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [
      {
        name: "Dashboard",
        classis: "active",
        anchor: "dashboard",
        icon: "dashboard",
        subnav: []
    },{
        name: "Home Banner",
        classis: "active",
        anchor: "banner",
        icon: "banner",
        subnav: []
    },{
        name: "Products",
        classis: "active",
        anchor: "product",
        icon: "building",
        subnav: []
    }
  ];



    return {
        getnav: function() {
            return navigation;
        },
        loginAdmin: function(formData, callback) {
            $http({
                url: adminURL + 'admin/login',
                method: 'POST',
                data: formData
            }).success(callback);
        },
        getOneBanner: function(id, callback) {
            $http({
                url: adminURL + 'banner/getOne',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        saveBanner: function(formData, callback) {
          console.log(formData);
            $http({
                url: adminURL + 'banner/saveData',
                method: 'POST',
                data: formData
            }).success(callback);
        },
        getAllBanners: function( callback) {
            $http({
                url: adminURL + 'banner/getall',
                method: 'POST'
            }).success(callback);
        },
        deleteBanner: function(callback) {
            $http({
                url: adminURL + 'banner/deleteData',
                method: 'POST',
                data: {
                    _id: $.jStorage.get("deleteBanner")
                }
            }).success(callback);
        },
        getOneProduct: function(id, callback) {
            $http({
                url: adminURL + 'product/getOne',
                method: 'POST',
                data: {
                    _id: id
                }
            }).success(callback);
        },
        saveProduct: function(formData, callback) {
          console.log(formData);
            $http({
                url: adminURL + 'product/saveData',
                method: 'POST',
                data: formData
            }).success(callback);
        },
        getAllProducts: function( callback) {
            $http({
                url: adminURL + 'product/getall',
                method: 'POST'
            }).success(callback);
        },
        deleteProduct: function(callback) {
            $http({
                url: adminURL + 'product/deleteData',
                method: 'POST',
                data: {
                    _id: $.jStorage.get("deleteProduct")
                }
            }).success(callback);
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        }
    };
});
