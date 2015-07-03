///<reference path="../typings/react/react.d.ts"/>
///<reference path="Components/Person/Learner/LearnerEdit.ts"/>
var App;
(function (App) {
    var LearnerEdit = App.Components.Person.Learner.LearnerEdit;
    React.render(<LearnerEdit name="MyApp" />, document.getElementById('container'));
})(App || (App = {}));
