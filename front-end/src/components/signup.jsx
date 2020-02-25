import * as React from "react";
import {Helmet} from 'react-helmet'
import qs from 'qs';
import {Fragment} from "react";

class SignUpComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
        };

        const user = JSON.parse(localStorage.getItem("Session"));
        if (user) {
            if (user.role === "Blog Author")
                this.props.history.push("blog");
        }
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
        console.log("[HERE] form-data", parsedData);

        fetch("http://127.0.0.1:8000/accounts/BlogRegister", {
                method: "POST",
                headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"},
                body: parsedData
            }
        ).then((response) => response.json()
        ).then((jsonR) => {
                if(jsonR.success === "1") {
                    localStorage.setItem("Session", JSON.stringify(jsonR.data));
                    this.props.history.push("blog/");
                }
                alert(jsonR.message)
            }
        ).catch((error) => console.log(error));
    };

    render() {
        return (
            <Fragment>
                <Helmet><title>{this.props.title}</title></Helmet>
                <div className="center-flex">
                    <div className="custom-card p-100 w-500 col-sm-12 col-md-8 col-lg-5 p-5">
                        <h2 className="card-title text-center mb-5">Registration form</h2>
                        <form onSubmit={this.handleSubmit}
                              method="POST">
                            <input type="text" className="input mb-4" placeholder={"First name"} name="first_name"/>
                            <input type="text" className="input mb-4" placeholder={"Last name"} name="last_name"/>
                            <input type="text" className="input mb-4" placeholder={"Email"} name="email"/>
                            <input type="password" className="input mb-4" placeholder={"Password"} name="password"/>
                            <input type="password" className="input mb-4" placeholder={"Repeat your password"}
                                   name="password"/>
                            <input type="submit" value="Register" className="btn btn-primary btn-block"/>
                        </form>
                        <div className="pt-4 text-center">Already a member? <a href="/login">Login</a></div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default (SignUpComponent);
