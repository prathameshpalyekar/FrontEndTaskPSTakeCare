module app.controller {
    class TimeTableController {
        static $inject = ['$scope', 'DataService'];

        constructor($scope: ng.IScope, service: app.Service.DataService) {
            var self = this;
            // Each Data.txt represents different timing scenario
            // Different scenarios has been handled through same function only

            var promise = service.GetData('Data.txt');
            promise.then(function (result) {  // this is only run after $http completes
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
        public CalculateAvailability(WeeklyTimings: app.models.timing): string {
            // Getting hold of all properties of timing object i.e all days and storing in array DailyTimings
            var DailyTimings = Object.getOwnPropertyNames(WeeklyTimings);

            var WorkTime: string = "";
            var Holiday: string = "";
            var self = this;

            // For each element in array get Work time or holiday description
            DailyTimings.forEach(function (day) {

                var Timing: any = Object.getOwnPropertyDescriptor(WeeklyTimings, day);
                var WorkShifts: any = Timing.value;

                // If there is no Work shift timing declared for day , declare it as holiday
                if (WorkShifts.length == 0) {
                    if (Holiday != "")
                        Holiday += " and " + self.DayName(day);
                    else
                        Holiday = " except " + self.DayName(day);
                }
                else 
                    // Get Work time for a day
                    WorkTime = self.WorkTime(WorkShifts);
            });
            return WorkTime + Holiday;
        }

        // Returns work time for a day
        public WorkTime(WorkShifts: any): string {
            var self = this;
            var WorkTime = "";
            WorkShifts.forEach(function (workShift) {
                var startTime = workShift.from;
                var endTime = workShift.to;
                if (startTime == 0 && endTime == 2359)
                    WorkTime = "24x7"
                else {
                    if (WorkTime != "")
                        WorkTime += " , " + self.TimeValue(startTime) + " to " + self.TimeValue(endTime);
                    else
                        WorkTime = self.TimeValue(startTime) + " to " + self.TimeValue(endTime);
                }
            });
            return WorkTime;
        }

      // Returns timing in 12 hour format 
      public TimeValue(time: number): string {
          var watchTime: string = "";
          var hours: number = Math.floor(time / 100);
          var minutes: number = time % 100;
          var minuteString = "";

          if (minutes == 0)
              minuteString = "00";
          else
              minuteString = minutes.toString();

          if (hours < 12) {
              watchTime = hours.toString() + ":" + minuteString + " AM";
              if (hours == 0)
                  watchTime = "00" + ":" + minuteString + " AM";
          }
          else
              watchTime = (hours - 12).toString() + ":" + minuteString + " PM";
          return watchTime;
      }
    
      // Returns Day
      public DayName(day: string): string {
          var dayName: string = "";
            switch (day) {
                case 'mon': dayName = "Monday";
                    break;
                case 'tue': dayName = "Tuesday";
                    break;
                case 'wed': dayName = "Wednesday";
                    break;
                case 'thu': dayName = "Thursday";
                    break;
                case 'fri': dayName = "Friday";
                    break;
                case 'sat': dayName = "Saturday";
                    break;
                case 'sun': dayName = "Sunday";
                    break;
           }
           return dayName;
      }
    }

    angular.module("TimeSchedulerModule").controller("TimeTableController", TimeTableController)
} 