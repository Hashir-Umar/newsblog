import React from "react";
import {Card, Row, Col, Nav, Container, Badge} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {

        fetch("http://localhost:8000/news/posts/"
        ).then(response => response.json()
        ).then(json => this.setState({posts: json.data})
        ).then(json => console.log(json)
        ).catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={12}>
                            {this.state.posts.map(article =>
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
                                    </Card.Body>
                                </Card>)}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default (Home);