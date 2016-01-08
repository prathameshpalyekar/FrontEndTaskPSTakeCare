var app;
(function (app) {
    (function (models) {
        var Slots = (function () {
            function Slots(from, to) {
                this.from = from;
                this.to = to;
            }
            return Slots;
        })();
        models.Slots = Slots;
    })(app.models || (app.models = {}));
    var models = app.models;
})(app || (app = {}));
