var observableModule = require("tns-core-modules/data/observable");
const applicationSettings = require("application-settings");
function HomeViewModel() {
  var viewModel = observableModule.fromObject({
    textFieldValue1: applicationSettings.getString("mkmk1",""),


  });

  return viewModel; 
}

module.exports = HomeViewModel; 