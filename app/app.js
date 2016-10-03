var application = require("application");
var firebase = require("nativescript-plugin-firebase");

//initialize firebase, check console for status
firebase.init({
    url:'https://fir-test-d701d.firebaseio.com/'
}).then(
    function (instance) {
        console.log("firebase.init done");
    },
    function (error) {
        console.log("firebase.init error: " + error);
    }
)
application.start({ moduleName: "main-page" });
