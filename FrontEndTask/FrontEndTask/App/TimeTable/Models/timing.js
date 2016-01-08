var app;
(function (app) {
    (function (models) {
        var timing = (function () {
            function timing(mon, tue, wed, thu, fri, sat, sun) {
                this.mon = mon;
                this.tue = tue;
                this.wed = wed;
                this.thu = thu;
                this.fri = fri;
                this.sat = sat;
                this.sun = sun;
            }
            return timing;
        })();
        models.timing = timing;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
