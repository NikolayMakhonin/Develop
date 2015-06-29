///<reference path="../typings/react/react.d.ts"/>
///<reference path="Components/Learner/LearnerEdit.ts"/>

module App {
    var LearnerEdit = App.Components.Learner.LearnerEdit;

    React.render(
        <any>(() => {
            /*<LearnerEdit name="MyApp" />*/
        }),
	    document.getElementById('container')
    );

}
 