import React from "react";
import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import qs from 'qs';

class PostAddEditComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            authorID: 1,
            mode: this.props.mode,
            sectionTitle: this.props.sectionTitle,
            title: this.props.title,
            content: this.props.content,
            categories: [],
            tags: []
        };

        console.log(this.props.mode);
        console.log(this.props.title);
        console.log(this.props.content);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);

        const title = data.get("title");
        const content = data.get("content");

        let catIDs = [];
        const catOpt = event.target.categories.options;
        for (let i = 0; i < catOpt.length - 1; i++) {
            console.log(catOpt[i].selected);
            if (catOpt[i].selected) {
                catIDs.push(catOpt[i].value)
            }
        }

        let tagIDs = [];
        const tagOpt = event.target.tags.options;
        for (let i = 0; i < tagOpt.length - 1; i++) {
            if (tagOpt[i].selected) {
                tagIDs.push(tagOpt[i].value)
            }
        }

        console.log(title);
        console.log(content);
        console.log(catIDs);
        console.log(tagIDs);

        const formData = {
            title: title,
            content: content,
            categories: catIDs.join(","),
            tags: tagIDs.join(","),
            author: this.state.authorID
        };

        const parsedData = qs.stringify(formData);
        this.savePost(parsedData)
    };

    componentDidMount() {
        fetch("http://localhost:8000/news/BlogManagement/CategoryList/?author_id=" + this.state.authorID
        ).then(response => response.json()
        ).then(json => this.setState({categories: json.data})
        ).catch((error) => console.log(error));


        fetch("http://localhost:8000/news/BlogManagement/TagList/?author_id=" + this.state.authorID
        ).then(response => response.json()
        ).then(json => this.setState({tags: json.data})
        ).catch((error) => console.log(error));
    }

    savePost = (parsedData) => {
        console.log(parsedData);

        fetch("http://127.0.0.1:8000/news/posts", {
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
                            <Form.Label>Post Title: </Form.Label>
                            <Form.Control name="title" type="text" required/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Post Body: </Form.Label>
                            <Form.Control name="content" as="textarea" rows="5" required/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Categories: </Form.Label>
                            <Form.Control name="categories" as="select" multiple={true}>
                                {this.state.categories.map(
                                    category => <option key={category.id} value={category.id}>{category.title}</option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Tags: </Form.Label>
                            <Form.Control name="tags" as="select" multiple={true}>
                                {this.state.tags.map(
                                    tag => <option key={tag.id} value={tag.id}>{tag.title}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Button className="btn btn-block btn-primary" type="submit">
                            Save post
                        </Button>
                    </Form>
                </Card.Body>

            </Card>

        );
    }
}

export default PostAddEditComponent