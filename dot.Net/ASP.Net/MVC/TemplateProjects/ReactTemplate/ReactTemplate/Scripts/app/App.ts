///<reference path="../typings/react/react.d.ts"/>
///<reference path="Components/Person/Learner/LearnerEdit.ts"/>

module App {
    var LearnerEdit = App.Components.Person.Learner.LearnerEdit;

    React.render(
        <any>(() => {
            /*<LearnerEdit name="MyApp" />*/
        }),
	    document.getElementById('container')
    );

}
 