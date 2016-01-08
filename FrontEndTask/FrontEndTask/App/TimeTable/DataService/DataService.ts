module app.Service {
    export class DataService {

        public http;

        constructor($http) {
            this.http = $http;
        }

        GetData(url: string) {
            var httpService = this.http.get(url).then(function (response) {
                var obj = response.data;
                return obj;
            });
            return httpService;
        }
    }

    angular.module('TimeSchedulerModule').service("DataService", DataService);
} 