module app {
    var main = angular.module("TimeSchedulerModule", ["ngRoute"]);

    main.config(routeConfig);

    routeConfig.$inject = ["$routeProvider"];

    function routeConfig($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider.when("/TimeTable",
            {
                templateUrl: "TimeTable/TimeTable.html",
                controller: "TimeTableController"
            })
            .otherwise("/TimeTable");
    }
}