module app.models {
    export class timing{
        constructor(
            public mon : Array<app.models.Slots>,
            public tue: Array<app.models.Slots>,
            public wed: Array<app.models.Slots>,
            public thu: Array<app.models.Slots>,
            public fri: Array<app.models.Slots>,
            public sat: Array<app.models.Slots>,
            public sun: Array<app.models.Slots>
            ) {
        }
    }
}