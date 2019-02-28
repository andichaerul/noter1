var Observable = require("tns-core-modules/data/observable").Observable; 
// var observableModule = require("tns-core-modules/data/observable");
// function HomeViewModel1() {
//   var viewModel = observableModule.fromObject({
//     textFieldValue: "sasa",


//   });

//   return viewModel; 
// }

// module.exports = HomeViewModel1;

function onPageLoaded(args) {
	const page = args.object;
    const vm = new Observable();

    // in the following example the DatePicker properties are binded via Observableproperties
    const TODAY = new Date();
    vm.set("date", TODAY); // the binded date property accepts Date object
    vm.set("minDate", new Date(1975, 0, 29)); // the binded minDate property accepts Date object
    vm.set("maxDate", new Date(2045, 4, 12)); // the binded maxDate property accepts Date object

    page.bindingContext = vm;
    console.log("Page Loaded");
}
exports.onPageLoaded = onPageLoaded;

function onDatePickerLoaded(args) {
    const datePicker = args.object;
    datePicker.on("dateChange", (args) => {
        console.dir(args);
    });
    datePicker.on("dayChange", (args) => {
        console.dir(args);
    });
    datePicker.on("monthChange", (args) => {
        console.dir(args);
    });
    datePicker.on("yearChange", (args) => {
        console.dir(args);
    });

}
exports.onDatePickerLoaded = onDatePickerLoaded;
// const fromObject = require("tns-core-modules/data/observable").fromObject; 
function onTap(args) {
	const button = args.object;
	const page = button.page;
    const vm = page.bindingContext;
    page.frame.goBack();
	var mama = vm.get("textFieldVal"); 
	alert(mama);
	const applicationSettings = require("application-settings");
	applicationSettings.setString("mkmk1", mama);
}
exports.onTap = onTap;

