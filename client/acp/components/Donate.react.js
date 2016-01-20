var React            = require('react'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin'),

    Actions          = require('../actions/Actions'),

    App              = require('app');

var Donate = React.createClass({
    mixins: [LinkedStateMixin],

    componentDidMount: function () {
        this.stripeHandler = require('StripeCheckout').configure({
            key       : 'pk_live_AcfQs725nv7nIF5sRCG3v4Q8',
            image     : 'https://s3.amazonaws.com/stripe-uploads/acct_16mDSJB8UmE70jk7merchant-icon-1442539384457-ava-mdpi.jpg',
            locale    : 'auto',
            panelLabel: 'Donate {{amount}}',
            email     : App.user.email,
            bitcoin   : true,
            token     : function (token) {
                // Use the token to create the charge with a server-side script.
                // You can access the token ID with `token.id`
                // NOOP
            }
        });
    },

    getInitialState: function () {
        return {
            amount: null
        };
    },

    render: function () {
        return (
            <div>
                <p>Do you like plugin? Support developer. Make a donation. Thank you in advance.</p>

                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Amount"
                        valueLink={this.linkState('amount')}/>
                        <span className="input-group-btn">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={this._donateDidClick}>Donate <small>via Stripe</small>
                            </button>
                        </span>
                </div>
            </div>
        );
    },

    _donateDidClick: function () {
        var amount = parseFloat(this.state.amount) * 100;
        amount = amount || 500;

        this.stripeHandler.open({
            name       : 'Nicolas Siver',
            description: 'NS Awards Donation',
            amount     : amount
        });
    }
});

module.exports = Donate;
