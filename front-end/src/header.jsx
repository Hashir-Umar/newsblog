import * as React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet'

class HeaderComponent extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            title: "News Blog",
        }
    }

    /*
    componentDidMount() {
        if (!Array.isArray(this.props.posts) || !this.props.posts.length)
            this.props.getPosts();
    }
    */

    render() {
        return <div>
            <Helmet><title>{this.state.title}</title></Helmet>
            <nav className="navbar navbar-expand-lg">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="wrapper-navbar">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <span className="logo d-none d-lg-inline">NEWS BLOG</span>
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        {'\u00A0'}<i className="fas fa-home"></i>{'\u00A0'}{'\u00A0'}Home{'\u00A0'}
                    </li>
                    <li className="nav-item">
                        {'\u00A0'}{'\u00A0'}{'\u00A0'}<i className="fa fa-user"></i>{'\u00A0'}{'\u00A0'}Our Members{'\u00A0'}{'\u00A0'}{'\u00A0'}
                    </li>
                    <li className="nav-item">
                        {'\u00A0'}{'\u00A0'}{'\u00A0'}<i className="fas fa-envelope"></i>{'\u00A0'}{'\u00A0'}Contact Us{'\u00A0'}{'\u00A0'}{'\u00A0'}
                    </li>
                    <li className="nav-item">
                        {'\u00A0'}{'\u00A0'}{'\u00A0'}<i className="fas fa-search-location"></i>{'\u00A0'}{'\u00A0'}Search{'\u00A0'}{'\u00A0'}{'\u00A0'}
                    </li>
            </ul>
            </div>
            </div>
        </nav>
        </div>
    }
}

export default (HeaderComponent);
