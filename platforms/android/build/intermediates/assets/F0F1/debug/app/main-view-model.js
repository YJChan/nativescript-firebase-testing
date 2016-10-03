var Observable = require("data/observable").Observable;
var firebase = require("nativescript-plugin-firebase");
function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}
var refFire = new firebase("https://fir-test-d701d.firebaseio.com/");

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);
    
    viewModel.onTap = function () {
        var userRef = refFire.child("user");
        userRef.set({
            alanisawesome: {
                date_of_birth: "June 23, 1912",
                full_name: "Alan Turing"
            },
            gracehop: {
                date_of_birth: "December 9, 1906",
                full_name: "Grace Hopper"
            }
        });

        this.counter--;
        this.set("message", getMessage(this.counter));
    }

    viewModel.onFire = function() {
        firebase.login({
            type: firebase.LoginType.ANONYMOUS
        }).then(
            function (result) {
                alert({title: "Response", message: JSON.stringify(result), okButtonText:"Close"});
            },
            function (errorMessage) {
                console.log(errorMessage);
            }
        ).then(
            function (user){
                alert("User id:" + user.uid);
            }, 
            function (errorMessage) {
                console.log(errorMessage);
            }
        )
    }

    return viewModel;
}

exports.createViewModel = createViewModel;