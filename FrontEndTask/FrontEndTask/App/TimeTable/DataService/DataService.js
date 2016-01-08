var app;
(function (app) {
    (function (Service) {
        var DataService = (function () {
            function DataService($http) {
                this.http = $http;
            }
            DataService.prototype.GetData = function (url) {
                var httpService = this.http.get(url).then(function (response) {
                    var obj = response.data;
                    return obj;
                });
                return httpService;
            };
            return DataService;
        })();
        Service.DataService = DataService;

        angular.module('TimeSchedulerModule').service("DataService", DataService);
    })(app.Service || (app.Service = {}));
    var Service = app.Service;
})(app || (app = {}));
