import React from "react";
import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import qs from 'qs';

class CategoryAddEditComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            authorID: 1,
            mode: this.props.mode,
            sectionTitle: this.props.sectionTitle,
            title: this.props.title,
        };

        console.log(this.props.mode);
        console.log(this.props.title);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const title = data.get("title");

        const formData = {
            title: title,
            author: this.state.authorID
        };

        const parsedData = qs.stringify(formData);
        this.savePost(parsedData)
    };

    savePost = (parsedData) => {
        console.log(parsedData);

        fetch("http://127.0.0.1:8000/news/category", {
                method: "POST",
                headers: {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", 'Access-Control-Allow-Credentials': 'true'},
                body: parsedData
            }
        ).then((response) => console.log(response)
        ).catch((error) => console.log(error));
    };

    render() {
        return (
            <Card>
                <Card.Header className="text-primary">
                    {this.state.mode} {this.state.sectionTitle}
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group name="title" controlId="exampleForm.ControlInput1">
                            <Form.Label>Category Title: </Form.Label>
                            <Form.Control name="title" type="text" required/>
                        </Form.Group>
                        <Button className="btn btn-block btn-primary" type="submit">
                            Save Category
                        </Button>
                    </Form>
                </Card.Body>

            </Card>

        );
    }
}

export default CategoryAddEditComponent