import * as React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import '../styles.css';
import {Helmet} from 'react-helmet'

class HeaderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "News Blog",
        }
    }

    render() {
        return (
            <div>
                <Helmet><title>{this.props.title}</title></Helmet>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default (HeaderComponent);
