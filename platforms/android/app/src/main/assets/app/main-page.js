/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
// var frameModule = require("tns-core-modules/ui/frame");
var HomeViewModel = require("./main-view-model");
var homeViewModel = new HomeViewModel();

// var HomeViewModel1 = require("./item-page");
// var homeViewModel1 = new HomeViewModel1();

/*
NativeScript adheres to the CommonJS specification for dealing with
JavaScript modules. The CommonJS require() function is how you import
JavaScript modules defined in other files.
*/ 
function onNavigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    var page = args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and JavaScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = homeViewModel;
     
    // page.bindingContext = homeViewModel1;

}
/*
Exporting a function in a NativeScript code-behind file makes it accessible
to the file’s corresponding XML file. In this case, exporting the onNavigatingTo
function here makes the navigatingTo="onNavigatingTo" binding in this page’s XML
file work.
*/
exports.onNavigatingTo = onNavigatingTo;
function opendatepicker(args) {
    const button = args.object;
    const page = button.page;
    page.frame.navigate("item-page");
}
exports.opendatepicker = opendatepicker;