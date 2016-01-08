var app;
(function (app) {
    var main = angular.module("TimeSchedulerModule", ["ngRoute"]);

    main.config(routeConfig);

    routeConfig.$inject = ["$routeProvider"];

    function routeConfig($routeProvider) {
        $routeProvider.when("/TimeTable", {
            templateUrl: "TimeTable/TimeTable.html",
            controller: "TimeTableController"
        }).otherwise("/TimeTable");
    }
})(app || (app = {}));
