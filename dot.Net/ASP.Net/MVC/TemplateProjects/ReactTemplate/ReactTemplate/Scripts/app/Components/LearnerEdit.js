///<reference path="../../typings/react/react.d.ts"/>
var App;
(function (App) {
    var Components;
    (function (Components) {
        var Learner;
        (function (_Learner) {
            //SubsectorsActionCreators = require('../actions/subsectors_actions');
            //ItemErrorsBlock = require('./item_errors_block');
            var LearnerSpec = (function () {
                function LearnerSpec() {
                    this.displayName = "Learner Edit";
                    this.propTypes = {
                        subsector: React.PropTypes.object.isRequired
                    };
                }
                LearnerSpec.prototype.onTextChange = function (e) {
                    //var params;
                    //params = {
                    //    name: e.target.value
                    //};
                    //return SubsectorsActionCreators.update_text(this.props.subsector, params);
                };
                LearnerSpec.prototype.componentDidMount = function () {
                };
                LearnerSpec.prototype.render = function () {
                    var x = (function () {
                        /*
                        <div>
                          <div>
                            <button onClick={@_onDelete} className="btn btn-default btn-sm pull-left">
                              <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                            <div className='subsector_input'>
                              <input
                                id={'subsector_' + @props.subsector.id}
                                ref='subsector_input'
                                placeholder='new subsector'
                                onChange={@_onNameChange}
                                onKeyDown={@_onKeyDown}
                                value={@props.subsector.name}
                                autoFocus={true}
                              />
                              </div>
                            <button onClick={@_onCancel} className="btn btn-default btn-sm pull-right">
                              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                            <button onClick={@_onSave} className="btn btn-default btn-sm pull-right">
                              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                            </button>
                          </div>
                          <div className='subsector_textarea'>
                            <textarea
                              rows="3"
                              placeholder="Description..."
                              onChange={@_onDescChange}
                              value={@props.subsector.description}
                            />
                          </div>
                          {errors_elem}
                        </div>
                    */ });
                    return x;
                };
                return LearnerSpec;
            })();
            _Learner.Learner = React.createClass(new LearnerSpec());
        })(Learner = Components.Learner || (Components.Learner = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
//# sourceMappingURL=LearnerEdit.js.map