var Observable = require("data/observable").Observable;
var firebase = require("nativescript-plugin-firebase");
function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);
    
    viewModel.onTap = function () {
        var alanisawesome =  {
                date_of_birth: "June 23, 1912",
                full_name: "Alan Turingiii"
            };
        var gracehop= {
                country: 'USA',
                name: 'Google'
            };

        var jsonTxt = JSON.stringify(gracehop, null, "\t");
        firebase.setValue(
            '/user',
            {'username' : alanisawesome.full_name,
             'date_of_birth' : alanisawesome.date_of_birth
            }
        );
        firebase.setValue(
            '/companies',[
            {
                'name' : gracehop.name,
                'country' : gracehop.country
            },
            {name: 'Telerik', country: 'Bulgaria'},
            {name: 'Yahoo', country: 'USA'}
            ]
        )
        this.counter--;
        this.set("message", getMessage(this.counter));
    }

    viewModel.onQuery = function(){
        var onQueryEvent = function (result) {
            if(!result.error){
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
            }
        };

        firebase.query(
            onQueryEvent,
            "/companies",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'country' 
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: 'Bulgaria'
                },
                limit: {
                    type: firebase.QueryLimitType.LAST, 
                    value: 2
                }
            }
        )
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