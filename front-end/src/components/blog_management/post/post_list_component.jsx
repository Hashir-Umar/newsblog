import React from "react";
import {Badge, Card} from "react-bootstrap";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

class PostListComponent extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.posts);
    }

    render() {
        return (
            this.props.posts.map(article =>
                <Card key={article.id} className="mb-2">
                    <Card.Body>
                        <Card.Title className="d-flex justify-content-between text-primary">
                            {article.title}
                            <small><Badge pill
                                          variant={article.status}>{article.status}</Badge></small>
                        </Card.Title>
                        <Card.Body className="text-justify">
                            {article.body}
                        </Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Posted
                                on: {article.status_action_date}</small>
                            <div>
                                <span className="btn btn-sm btn-warning text-light mr-2">
                                    <FontAwesomeIcon icon={faEdit}/>
                                </span>

                                <span className="btn btn-sm btn-danger">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </span>
                            </div>
                        </div>

                    </Card.Body>
                </Card>
            )
        );
    }
}

export default PostListComponent