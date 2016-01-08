var app;
(function (app) {
    (function (controller) {
        var TimeTableController = (function () {
            function TimeTableController($scope, service) {
                var self = this;

                // Each Data.txt represents different timing scenario
                // Different scenarios has been handled through same function only
                var promise = service.GetData('Data.txt');
                promise.then(function (result) {
                    $scope.timings0 = self.CalculateAvailability(result.timing);
                });

                var promise = service.GetData('Data1.txt');
                promise.then(function (result) {
                    $scope.timings1 = self.CalculateAvailability(result.timing);
                });

                var promise = service.GetData('Data2.txt');
                promise.then(function (result) {
                    $scope.timings2 = self.CalculateAvailability(result.timing);
                });

                var promise = service.GetData('Data3.txt');
                promise.then(function (result) {
                    $scope.timings3 = self.CalculateAvailability(result.timing);
                });

                var promise = service.GetData('Data4.txt');
                promise.then(function (result) {
                    $scope.timings4 = self.CalculateAvailability(result.timing);
                });

                var promise = service.GetData('Data5.txt');
                promise.then(function (result) {
                    $scope.timings5 = self.CalculateAvailability(result.timing);
                });
            }
            // Returns the desired output timing in string format
            TimeTableController.prototype.CalculateAvailability = function (WeeklyTimings) {
                // Getting hold of all properties of timing object i.e all days and storing in array DailyTimings
                var DailyTimings = Object.getOwnPropertyNames(WeeklyTimings);

                var WorkTime = "";
                var Holiday = "";
                var self = this;

                // For each element in array get Work time or holiday description
                DailyTimings.forEach(function (day) {
                    var Timing = Object.getOwnPropertyDescriptor(WeeklyTimings, day);
                    var WorkShifts = Timing.value;

                    // If there is no Work shift timing declared for day , declare it as holiday
                    if (WorkShifts.length == 0) {
                        if (Holiday != "")
                            Holiday += " and " + self.DayName(day);
                        else
                            Holiday = " except " + self.DayName(day);
                    } else
                        // Get Work time for a day
                        WorkTime = self.WorkTime(WorkShifts);
                });
                return WorkTime + Holiday;
            };

            // Returns work time for a day
            TimeTableController.prototype.WorkTime = function (WorkShifts) {
                var self = this;
                var WorkTime = "";
                WorkShifts.forEach(function (workShift) {
                    var startTime = workShift.from;
                    var endTime = workShift.to;
                    if (startTime == 0 && endTime == 2359)
                        WorkTime = "24x7";
                    else {
                        if (WorkTime != "")
                            WorkTime += " , " + self.TimeValue(startTime) + " to " + self.TimeValue(endTime);
                        else
                            WorkTime = self.TimeValue(startTime) + " to " + self.TimeValue(endTime);
                    }
                });
                return WorkTime;
            };

            // Returns timing in 12 hour format
            TimeTableController.prototype.TimeValue = function (time) {
                var watchTime = "";
                var hours = Math.floor(time / 100);
                var minutes = time % 100;
                var minuteString = "";

                if (minutes == 0)
                    minuteString = "00";
                else
                    minuteString = minutes.toString();

                if (hours < 12) {
                    watchTime = hours.toString() + ":" + minuteString + " AM";
                    if (hours == 0)
                        watchTime = "00" + ":" + minuteString + " AM";
                } else
                    watchTime = (hours - 12).toString() + ":" + minuteString + " PM";
                return watchTime;
            };

            // Returns Day
            TimeTableController.prototype.DayName = function (day) {
                var dayName = "";
                switch (day) {
                    case 'mon':
                        dayName = "Monday";
                        break;
                    case 'tue':
                        dayName = "Tuesday";
                        break;
                    case 'wed':
                        dayName = "Wednesday";
                        break;
                    case 'thu':
                        dayName = "Thursday";
                        break;
                    case 'fri':
                        dayName = "Friday";
                        break;
                    case 'sat':
                        dayName = "Saturday";
                        break;
                    case 'sun':
                        dayName = "Sunday";
                        break;
                }
                return dayName;
            };
            TimeTableController.$inject = ['$scope', 'DataService'];
            return TimeTableController;
        })();

        angular.module("TimeSchedulerModule").controller("TimeTableController", TimeTableController);
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));
