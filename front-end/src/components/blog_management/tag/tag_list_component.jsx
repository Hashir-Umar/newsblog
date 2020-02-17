import React from "react";
import {Badge, Card} from "react-bootstrap";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

class TagListComponent extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.tags);
    }

    render() {
        const size = this.props.tags;
        return (
            <div>
                {!size ? <p className="text-primary text-center">No records were
                    found</p> : this.props.tags.map(tag =>
                    <Card key={tag.id} className="mb-2">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between text-primary">
                                {tag.title}
                            </Card.Title>

                            <div className="d-flex justify-content-end align-items-center">
                                <span className="btn btn-sm btn-warning text-light mr-2">
                                    <FontAwesomeIcon icon={faEdit}/>
                                </span>

                                <span className="btn btn-sm btn-danger">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </span>
                            </div>

                        </Card.Body>
                    </Card>
                )}
            </div>

        );
    }
}

export default TagListComponent