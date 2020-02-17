import React from "react";
import {Badge, Card} from "react-bootstrap";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

class CategoryListComponent extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.categories);
    }

    render() {
        const size = this.props.categories;
        return (
            <div>
                {!size ? <p className="text-primary text-center">No records were
                    found</p> : this.props.categories.map(category =>
                    <Card key={category.id} className="mb-2">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between text-primary">
                                {category.title}
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
                )
                }
            </div>

        );
    }
}

export default CategoryListComponent