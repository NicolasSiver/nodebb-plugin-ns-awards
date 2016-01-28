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

                <div className="row">
                    <div className="col-md-6">
                        <h5>Stripe:</h5>

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
                                onClick={this._donateDidClick}>Donate via Stripe
                            </button>
                        </span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5>PayPal:</h5>

                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                            <input type="hidden" name="cmd" value="_s-xclick"/>
                            <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHTwYJKoZIhvcNAQcEoIIHQDCCBzwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYADFMHuCYxOg7gfS/mhJGGnN7ioPOL/Riz96CvvxFCv5zS/24VOd8zctu/k8NopEhSUeSv50LDTHh1V4XXeSOKo2+jt0AKHKuLYGXH/6cgeynYEobE65PSMtMOrDTGumtooQyBGHWLQbhoc9psGAh7lu+HFoEQuRTQRpLfnX/yPzTELMAkGBSsOAwIaBQAwgcwGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQI1PzgZLAB29yAgagrpAqgg2zfAqW2OYV6sUn8pXORe8ul5e82C73dEqJUc+Wog33ARnXpMsFQKWbPmzBbvXqa8hl+5umr022L3dIzn1gthfcKR78sI3+607lwwsfj21pryqnfqiaF8M/LRIYfRTjBRkSyZ1BnO54rq9EEGhfvc/QqOVUdO5FxRSi7/IG+WfrisHcJBFF+/Zeu1N3KtDUVgVybuP/QV/5i396H+mcs3hCnmf2gggOHMIIDgzCCAuygAwIBAgIBADANBgkqhkiG9w0BAQUFADCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20wHhcNMDQwMjEzMTAxMzE1WhcNMzUwMjEzMTAxMzE1WjCBjjELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHBheXBhbC5jb20wgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMFHTt38RMxLXJyO2SmS+Ndl72T7oKJ4u4uw+6awntALWh03PewmIJuzbALScsTS4sZoS1fKciBGoh11gIfHzylvkdNe/hJl66/RGqrj5rFb08sAABNTzDTiqqNpJeBsYs/c2aiGozptX2RlnBktH+SUNpAajW724Nv2Wvhif6sFAgMBAAGjge4wgeswHQYDVR0OBBYEFJaffLvGbxe9WT9S1wob7BDWZJRrMIG7BgNVHSMEgbMwgbCAFJaffLvGbxe9WT9S1wob7BDWZJRroYGUpIGRMIGOMQswCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLFApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbYIBADAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBBQUAA4GBAIFfOlaagFrl71+jq6OKidbWFSE+Q4FqROvdgIONth+8kSK//Y/4ihuE4Ymvzn5ceE3S/iBSQQMjyvb+s2TWbQYDwcp129OPIbD9epdr4tJOUNiSojw7BHwYRiPh58S1xGlFgHFXwrEBb3dgNbMUa+u4qectsMAXpVHnD9wIyfmHMYIBmjCCAZYCAQEwgZQwgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tAgEAMAkGBSsOAwIaBQCgXTAYBgkqhkiG9w0BCQMxCwYJKoZIhvcNAQcBMBwGCSqGSIb3DQEJBTEPFw0xNjAxMjgwMzIyNDlaMCMGCSqGSIb3DQEJBDEWBBS+nojMcS6t84UJDi6zge5SEpM9zTANBgkqhkiG9w0BAQEFAASBgH72sVSHH1kjiffADAlTZJVipTDtVwUOsNuJhF95rBK/dG/4EdwASUYtMSSQBAUyGMXZysqwUVtv24TtwgBN9lhkDAdRNmpCqjSrbiws5Ll5ApijvyKX9IpcZvZSGPTXC+va6RC22IeeMosNusfSQSBoKmBUaDWzOMltJa/rNxZz-----END PKCS7-----"/>
                            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                            <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                        </form>
                    </div>
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
