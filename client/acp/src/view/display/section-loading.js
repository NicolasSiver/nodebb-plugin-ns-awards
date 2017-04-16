import React from 'react';

export default class SectionLoading extends React.Component {

    render() {
        return (
            <div className="section-loading">
                <div className="section-loading__animation">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" strokeWidth="6" strokeLinecap="round">
                            <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502"></animate>
                            <animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate>
                        </circle>
                    </svg>
                </div>
            </div>
        );
    }

}
