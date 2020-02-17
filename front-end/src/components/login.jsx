import * as React from "react";
import {Helmet} from 'react-helmet'
import qs from 'qs';
import {Fragment} from "react";
import {validateEmail, validatePassword} from '../script/validationForm'

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            emailError: false,
            passwordError: false,
        };

    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem("Session"));
        if(user) {
            if (user.role === "Blog Author")
                this.props.history.push("blog/");
        }
    }

    handleSubmit = (event) => {

        event.preventDefault();

        this.setState({
            emailError: false,
            passwordError: false
        });

        const data = new FormData(event.target);

        const formData = {
            email: data.get("email"),
            password: data.get("password")
        };

        this.validateAndProceed(formData.email, formData.password);

        const parsedData = qs.stringify(formData);

        fetch("http://127.0.0.1:8000/accounts/BlogLogin", {
                method: "POST",
                headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"},
                body: parsedData
            }
        ).then((response) => response.json()
        ).then((jsonR) => {localStorage.setItem("Session", JSON.stringify(jsonR.data)); this.props.history.push("blog/"); console.log(jsonR)}
        ).catch((error) => console.log(error));
    };

    validateAndProceed(email, password) {
        if (!validateEmail(email)) {
            this.setState({
                emailError: true
            });
        }

        if (!validatePassword((password))) {
            this.setState({
                passwordError: true
            });
        }
    }

    render() {
        const emailError = this.state.emailError;
        const passwordError = this.state.passwordError;
        return (
            <Fragment>
                <Helmet><title>{this.props.title}</title></Helmet>
                <div className="center-flex">
                    <div className="custom-card-login col-sm-12 col-md-8 col-lg-5 p-5">
                        <h2 className="card-title text-center mb-5">Login</h2>
                        <form onSubmit={this.handleSubmit} method="POST">
                            {emailError ?
                                <span className="input-error">Email is invalid</span> : <span/>
                            }
                            <input type="text" className="input mb-4" placeholder={"Email"} name="email" required/>
                            {passwordError ?
                                <span className="input-error">Password must be at-least 8 character long</span> :
                                <span/>
                            }
                            <input type="password" className="input mb-4" placeholder={"Password"} name="password"
                                   required/>
                            <input type="submit" value="Login" className="btn btn-primary btn-block"/>
                        </form>
                        <div className="pt-4 text-center">Dont have an account? <a href="#">Register</a></div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default (LoginComponent);
