import * as React from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet'
import qs from 'qs';


class SignupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    handleSubmit = (event) => {

        event.preventDefault();
        const data = new FormData(event.target);
        const formData = {
            email: data.get("email"),
            password: data.get("password"),
            first_name: data.get("first_name"),
            last_name: data.get("last_name")
        };

        const parsedData = qs.stringify(formData);
        console.log("[HERE] qs", parsedData);

        fetch("http://127.0.0.1:8000/accounts/BlogRegister", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: parsedData
        }).then((r) => {
            console.log(r);
        });
    };

    render() {
        return <div className="container">
            <form name="signup" onSubmit={this.handleSubmit} method="POST">
                <div className="col-sm-12 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
                    <div className="container">
                        <div className="logo-container text-center mb-4">
                            <div className="logo d-inline font-20 margin-left-70">NEWS BLOG</div>
                        </div>
                        <div style={{background: '#ECECEC'}} className="card mb-2">
                            <div className="card-header">
                                <h1 className="text-center"> Sign<span>up </span></h1>
                            </div>
                            <div className="card-body">
                                <div className="input-group mb-1 mb-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fas fa-user"></i></div>
                                    </div>
                                    <input className="form-control" id="signup-first-name" type="text" name="first_name"
                                           placeholder="First Name" required/>
                                </div>
                                <div className="input-group mb-1 mb-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fas fa-user"></i></div>
                                    </div>
                                    <input className="form-control" id="signup-last-name" type="text" name="last_name"
                                           placeholder="Last Name" required/>
                                </div>
                                <div className="input-group mb-1 mb-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fas fa-envelope"></i></div>
                                    </div>
                                    <input className="form-control" id="signup-email" type="text" name="email"
                                           placeholder="Enter your Email" required/>
                                    <div className="loader-gif"></div>
                                </div>
                                <span id="email_error" className="text-danger"> </span>
                                <div className="input-group mb-1 mb-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fas fa-key"></i></div>
                                    </div>
                                    <input className="form-control" id="signup-password" type="password" name="password"
                                           placeholder="Password" required/>
                                </div>
                                <span id="pass_error" className="text-danger"> </span>
                                <div className="input-group mb-1 mb-md-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fas fa-key"></i></div>
                                    </div>
                                    <input className="form-control" id="signup-confirm-password" type="password"
                                           name="confirm_password" placeholder="Confirm your password" required/>
                                </div>
                                <span id="cnfrm_pass_error" className="text-danger"> </span>
                                <div className="d-flex justify-content-center align-items-center mb-1">
                                    <button type="submit" name="submit" className="btn btn-md btn-dark px-4"> Register
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center"><i
                                    className="fas fa-sign-in-alt"></i>{'\u00A0'}{'\u00A0'}Already Have An Account?
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default (SignupComponent);
