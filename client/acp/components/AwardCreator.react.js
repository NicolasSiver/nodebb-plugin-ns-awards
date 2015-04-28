var React   = require('react'),
    Actions = require('../actions/Actions');

var AwardCreator = React.createClass({
    componentDidMount: function () {
    },

    componentWillUnmount: function () {
    },

    getInitialState: function () {
        return {
            creating: false
        };
    },

    render: function () {
        var inputState;
        if (this.state.creating) {
            inputState = <form>
                <div className="form-group">
                    <label htmlFor="awardName">Name</label>
                    <input type="text" className="form-control" id="awardName" placeholder="Enter name"/>
                </div>
                <div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <input type="file" id="exampleInputFile"/>

                    <p class="help-block">Example block-level help text here.</p>
                </div>
            </form>;
        } else {
            inputState = <div className="media">
                <div className="media-left media-middle">
                    <button
                        className="btn btn-success"
                        onClick={this._initAwardForm}
                        type="button">Create Award
                    </button>
                </div>
                <div className="media-body">
                    It is important to give short and clear name, for example: 'Four-Way Medal' or 'Miss Universe'
                </div>
            </div>;
        }
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    {inputState}
                </div>
            </div>
        );
    },

    _initAwardForm: function () {
        this.setState({
            creating: true
        });
    }
});

module.exports = AwardCreator;